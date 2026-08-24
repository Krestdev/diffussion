"use client"

import { useRouter } from "next/navigation"

import { PageHeader } from "@/components/shared/page-header"
import { MailDocumentsStep } from "@/components/courriers/mail-documents-step"
import type { Mail } from "@/components/courriers/types"

export function MailCompleteForm({ mail }: { mail: Mail }) {
  const router = useRouter()

  return (
    <>
      <PageHeader
        variant="secondary"
        backHref="/courriers/entrants"
        title="Compléter le courrier"
        subtitle={mail.subject}
      />
      <MailDocumentsStep
        submitLabel="Enregistrer"
        onSubmit={() => router.push("/courriers/entrants")}
      />
    </>
  )
}
