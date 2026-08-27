"use client"

import { use } from "react"
import { notFound } from "next/navigation"

import { OutgoingMailForm } from "@/components/courriers-sortants/outgoing-mail-form"
import { OutgoingMailFormHeader } from "@/components/courriers-sortants/outgoing-mail-form-header"
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

  return (
    <>
      <OutgoingMailFormHeader mode="edit" />
      {isLoading || !mail ? (
        <p className="text-sm text-[#71717a]">Chargement…</p>
      ) : (
        <OutgoingMailForm mode="edit" mail={mail} />
      )}
    </>
  )
}
