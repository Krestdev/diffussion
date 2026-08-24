import { PageHeader } from "@/components/shared/page-header"
import { MailReferenceForm } from "@/components/courriers/mail-reference-form"

export default function Page() {
  return (
    <>
      <PageHeader
        title="Référence de courrier"
        subtitle="Générez une ou plusieurs références de courrier"
        backHref="/courriers/entrants"
      />
      <MailReferenceForm />
    </>
  )
}
