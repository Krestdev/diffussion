"use client"

import { use } from "react"
import { notFound } from "next/navigation"

import { MailWizard } from "@/components/courriers/mail-wizard"
import { useCourrier } from "@/hooks/courrier/useCourrier"

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const { data: mail, isLoading, isError } = useCourrier(id)

  if (isError) {
    notFound()
  }

  if (isLoading || !mail) {
    return <p className="text-sm text-[#71717a]">Chargement…</p>
  }

  return <MailWizard mode="edit" mail={mail} />
}
