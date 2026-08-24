import { notFound } from "next/navigation"

import { MailCompleteForm } from "@/components/courriers/mail-complete-form"
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

  return <MailCompleteForm mail={mail} />
}
