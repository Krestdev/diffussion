import { notFound } from "next/navigation"

import { MailWizard } from "@/components/courriers/mail-wizard"
import { getMail } from "@/components/courriers/data"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const mail = getMail(id)

  if (!mail) {
    notFound()
  }

  return <MailWizard mode="edit" mail={mail} />
}
