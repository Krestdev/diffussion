"use client"

import { use } from "react"
import { notFound } from "next/navigation"

import { FolderForm } from "@/components/dossiers/folder-form"
import { FolderFormHeader } from "@/components/dossiers/folder-form-header"
import { useDossier } from "@/hooks/dossier/useDossier"

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const { data: folder, isLoading, isError } = useDossier(id)

  if (isError) {
    notFound()
  }

  return (
    <>
      <FolderFormHeader mode="edit" />
      {isLoading || !folder ? (
        <p className="text-sm text-[#71717a]">Chargement…</p>
      ) : (
        <FolderForm mode="edit" folder={folder} />
      )}
    </>
  )
}
