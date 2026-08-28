"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"
import { getApiErrorMessage } from "@/lib/apiError"
import { CircuitOwnerField } from "@/components/shared/circuit-owner-field"
import { DocumentUploadField } from "@/components/shared/document-upload-field"
import { useCorrespondents } from "@/hooks/correspondent/useCorrespondent"
import { useCourrierNatures } from "@/hooks/courrierNature/useCourrierNature"
import { useDossiers } from "@/hooks/dossier/useDossier"
import { useUploadDocument } from "@/hooks/document/useDocument"
import { useCreateCourrier, useUpdateCourrier } from "@/hooks/courrier/useCourrier"
import type { Courrier } from "@/hooks/courrier/type"

export function OutgoingMailForm({
  mode,
  mail,
}: {
  mode: "create" | "edit"
  mail?: Courrier
}) {
  const router = useRouter()

  const [subject, setSubject] = useState(mail?.subject ?? "")
  const [dossierId, setDossierId] = useState(mail?.dossierId ?? "")
  const [correspondentId, setCorrespondentId] = useState(
    mail?.correspondentId ?? ""
  )
  const [natureId, setNatureId] = useState(mail?.natureId ?? "")
  const [reference, setReference] = useState(mail?.reference ?? "")
  const [ownerId, setOwnerId] = useState("")
  const [files, setFiles] = useState<File[]>([])

  const { data: dossiers } = useDossiers()
  const { data: correspondents } = useCorrespondents()
  const { data: natures } = useCourrierNatures()

  const createCourrier = useCreateCourrier()
  const updateCourrier = useUpdateCourrier()
  const uploadDocument = useUploadDocument()

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const payload = {
      subject,
      dossierId,
      direction: "SORTANT" as const,
      correspondentId: correspondentId || undefined,
      natureId: natureId || undefined,
      reference: reference || undefined,
      // Create-only (see CourrierPayload) — omitted entirely on edit so it's
      // never sent to the update endpoint, which doesn't accept it anyway.
      ownerId: mode === "create" ? ownerId || undefined : undefined,
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
        title: mode === "edit" ? "Courrier modifié" : "Courrier créé",
        type: "success",
      })
      router.push(mode === "edit" ? `/courriers/sortants/${courrier.id}` : "/courriers/sortants")
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
    <form
      onSubmit={handleSubmit}
      className="grid max-w-[760px] grid-cols-1 gap-4 sm:grid-cols-2"
    >
      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label className="text-sm font-medium text-[#18181b]">
          Intitulé <span className="text-[#dc2626]">*</span>
        </label>
        <Textarea
          required
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          placeholder="ex. Rapport d'activité Juin 2026"
          className="min-h-10 rounded border border-[#e4e4e7] px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#18181b]">
          Dossier <span className="text-[#dc2626]">*</span>
        </label>
        <Select
          value={dossierId}
          onValueChange={(v) => setDossierId(v ?? "")}
          required
        >
          <SelectTrigger className="h-9 w-full rounded border border-[#e4e4e7] px-4">
            <SelectValue placeholder="Sélectionner" />
          </SelectTrigger>
          <SelectContent>
            {dossiers?.data.map((dossier) => (
              <SelectItem key={dossier.id} value={dossier.id}>
                {dossier.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#18181b]">
          Correspondant
        </label>
        <Select
          value={correspondentId}
          onValueChange={(v) => setCorrespondentId(v ?? "")}
        >
          <SelectTrigger className="h-9 w-full rounded border border-[#e4e4e7] px-4">
            <SelectValue placeholder="Sélectionner" />
          </SelectTrigger>
          <SelectContent>
            {correspondents?.data.map((correspondent) => (
              <SelectItem key={correspondent.id} value={correspondent.id}>
                {correspondent.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#18181b]">Nature</label>
        <Select value={natureId} onValueChange={(v) => setNatureId(v ?? "")}>
          <SelectTrigger className="h-9 w-full rounded border border-[#e4e4e7] px-4">
            <SelectValue placeholder="Sélectionner" />
          </SelectTrigger>
          <SelectContent>
            {natures?.map((nature) => (
              <SelectItem key={nature.id} value={nature.id}>
                {nature.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#18181b]">
          Référence (facultatif)
        </label>
        <input
          value={reference}
          onChange={(event) => setReference(event.target.value)}
          placeholder="Référence imprimée sur le courrier"
          className="h-9 rounded border border-[#e4e4e7] px-4 text-sm text-[#2f2f2f] outline-none placeholder:text-[#b0b0b0]"
        />
      </div>

      {/* Owner is create-only (see CourrierPayload) — reassigning an
          existing courrier's owner goes through CircuitOwnerRow instead. */}
      {mode === "create" && (
        <CircuitOwnerField
          value={ownerId}
          onChange={setOwnerId}
        />
      )}

      <div className="sm:col-span-2">
        <DocumentUploadField
          files={files}
          onFilesAdded={(added) => setFiles((current) => [...current, ...added])}
          onRemove={(file) =>
            setFiles((current) => current.filter((item) => item !== file))
          }
        />
      </div>

      <div className="sm:col-span-2">
        <Button
          type="submit"
          disabled={isPending}
          className="h-11 rounded-lg bg-[#700032] px-5 text-base font-medium tracking-normal text-white normal-case hover:bg-[#700032]/90"
        >
          {mode === "edit" ? "Enregistrer les modifications" : "Enregistrer"}
        </Button>
      </div>
    </form>
  )
}
