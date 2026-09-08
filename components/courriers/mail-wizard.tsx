"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { PageHeader } from "@/components/shared/page-header"
import { toast } from "@/components/ui/toast"
import { getApiErrorMessage } from "@/lib/apiError"
import { MailDocumentsStep } from "@/components/courriers/mail-documents-step"
import { MailInfoStep } from "@/components/courriers/mail-info-step"
import { MailStepper } from "@/components/courriers/mail-stepper"
import { emptyMailDraft, type MailDraft } from "@/components/courriers/types"
import { useUploadDocument } from "@/hooks/document/useDocument"
import { useCreateCourrier, useUpdateCourrier } from "@/hooks/courrier/useCourrier"
import type { Courrier } from "@/hooks/courrier/type"

export function MailWizard({
  mode,
  mail,
}: {
  mode: "create" | "edit"
  mail?: Courrier
}) {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2>(1)
  const [draft, setDraft] = useState<MailDraft>(
    mail
      ? {
          subject: mail.subject,
          dossierId: mail.dossierId,
          correspondentId: mail.correspondentId ?? "",
          natureId: mail.natureId ?? "",
          reference: mail.reference ?? "",
          ownerId: "",
          respondsToId: mail.respondsToId ?? "",
        }
      : emptyMailDraft()
  )
  const [files, setFiles] = useState<File[]>([])

  const createCourrier = useCreateCourrier()
  const updateCourrier = useUpdateCourrier()
  const uploadDocument = useUploadDocument()

  async function handleFinalSubmit() {
    const payload = {
      subject: draft.subject,
      dossierId: draft.dossierId,
      direction: "ENTRANT" as const,
      correspondentId: draft.correspondentId || undefined,
      natureId: draft.natureId || undefined,
      reference: draft.reference || undefined,
      // Create-only (see CourrierPayload) — omitted entirely on edit so it's
      // never sent to the update endpoint, which doesn't accept it anyway.
      ownerId: mode === "create" ? draft.ownerId || undefined : undefined,
      respondsToId: draft.respondsToId || undefined,
    }

    try {
      const courrier =
        mode === "edit" && mail
          ? await updateCourrier.mutateAsync({ id: mail.id, body: payload })
          : await createCourrier.mutateAsync(payload)

      if (files.length > 0) {
        const results = await Promise.allSettled(
          files.map((file) =>
            uploadDocument.mutateAsync({ file, courrierId: courrier.id })
          )
        )
        const failed = results.filter((r) => r.status === "rejected").length
        if (failed > 0) {
          toast.add({
            title: `${failed} document(s) n'ont pas pu être téléversés`,
            description: "Vous pourrez réessayer depuis le courrier.",
            type: "error",
          })
        }
      }

      toast.add({
        title: mode === "edit" ? "Courrier modifié" : "Courrier enregistré",
        type: "success",
      })
      router.push(mode === "edit" ? `/courriers/entrants/${courrier.id}` : "/courriers/entrants")
    } catch (error) {
      toast.add({
        title: "Échec de l'enregistrement",
        description: getApiErrorMessage(error, "Veuillez réessayer."),
        type: "error",
      })
    }
  }

  const isPending =
    createCourrier.isPending || updateCourrier.isPending || uploadDocument.isPending

  return (
    <>
      <PageHeader
        variant="secondary"
        backHref={
          mode === "edit" && mail
            ? `/courriers/entrants/${mail.id}`
            : "/courriers/entrants"
        }
        title={
          mode === "edit" ? "Modifier un courrier" : "Enregistrer un courrier"
        }
        subtitle={
          mode === "edit"
            ? "Mettre à jour les informations relatives à un courrier"
            : "Complétez le formulaire pour enregistrer un nouveau courrier"
        }
      />
      <div className="flex flex-col gap-8 sm:flex-row">
        <MailStepper currentStep={step} />
        {step === 1 ? (
          <MailInfoStep
            mode={mode}
            draft={draft}
            onChange={setDraft}
            onNext={() => setStep(2)}
          />
        ) : (
          <MailDocumentsStep
            files={files}
            onFilesAdded={(added) => setFiles((current) => [...current, ...added])}
            onRemove={(file) =>
              setFiles((current) => current.filter((item) => item !== file))
            }
            onPrevious={() => setStep(1)}
            onSubmit={handleFinalSubmit}
            isPending={isPending}
          />
        )}
      </div>
    </>
  )
}
