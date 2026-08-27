"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { PageHeader } from "@/components/shared/page-header"
import { toast } from "@/components/ui/toast"
import { MailDocumentsStep } from "@/components/courriers/mail-documents-step"
import type { Courrier } from "@/hooks/courrier/type"

// Placeholder pending the Instructions phase: "compléter" a courrier is
// meant to close out its treatment by attaching final documents and/or
// generating an Instruction — deferred until Instructions is wired.
export function MailCompleteForm({ mail }: { mail: Courrier }) {
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])

  function handleSubmit() {
    toast.add({
      title: "Bientôt disponible",
      description: "Cette étape sera reliée aux instructions prochainement.",
      type: "info",
    })
    router.push("/courriers/entrants")
  }

  return (
    <>
      <PageHeader
        variant="secondary"
        backHref="/courriers/entrants"
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
        onSubmit={handleSubmit}
      />
    </>
  )
}
