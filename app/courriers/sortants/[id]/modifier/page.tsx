import { notFound } from "next/navigation"

import { OutgoingMailForm } from "@/components/courriers-sortants/outgoing-mail-form"
import { OutgoingMailFormHeader } from "@/components/courriers-sortants/outgoing-mail-form-header"
import { getOutgoingMail } from "@/components/courriers-sortants/data"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const mail = getOutgoingMail(id)

  if (!mail) {
    notFound()
  }

  return (
    <>
      <OutgoingMailFormHeader mode="edit" />
      <OutgoingMailForm mode="edit" mail={mail} />
    </>
  )
}
