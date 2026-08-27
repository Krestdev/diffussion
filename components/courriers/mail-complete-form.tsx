"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { PageHeader } from "@/components/shared/page-header"
import { toast } from "@/components/ui/toast"
import { MailDocumentsStep } from "@/components/courriers/mail-documents-step"
import { useUploadDocument } from "@/hooks/document/useDocument"
import type { Courrier } from "@/hooks/courrier/type"

// "Compléter" closes out an entrant courrier's treatment by attaching its
// final documents (7.2 / 10.2.4.8). Generating an Instruction from the
// same moment is covered by the courrier page's own "Ajouter une tâche"
// action (AddTaskDialog) rather than duplicated here.
export function MailCompleteForm({ mail }: { mail: Courrier }) {
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])
  const uploadDocument = useUploadDocument()
  const detailHref = `/courriers/entrants/${mail.id}`

  async function handleSubmit() {
    if (files.length === 0) {
      router.push(detailHref)
      return
    }

    const results = await Promise.allSettled(
      files.map((file) => uploadDocument.mutateAsync({ file, courrierId: mail.id }))
    )
    const failed = results.filter((result) => result.status === "rejected").length

    if (failed > 0) {
      toast.add({
        title: `${failed} document(s) n'ont pas pu être ajoutés`,
        description: "Vous pourrez réessayer depuis la fiche du courrier.",
        type: "error",
      })
    }
    if (failed < files.length) {
      toast.add({ title: "Documents ajoutés", type: "success" })
    }
    router.push(detailHref)
  }

  return (
    <>
      <PageHeader
        variant="secondary"
        backHref={detailHref}
        title="Compléter le courrier"
        subtitle={mail.subject}
      />
      <MailDocumentsStep
        files={files}
        onFilesAdded={(added) => setFiles((current) => [...current, ...added])}
        onRemove={(file) =>
          setFiles((current) => current.filter((item) => item !== file))
        }
        submitLabel="Enregistrer"
        isPending={uploadDocument.isPending}
        onSubmit={handleSubmit}
      />
    </>
  )
}
