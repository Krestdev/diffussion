import { notFound } from "next/navigation"

import { FolderForm } from "@/components/dossiers/folder-form"
import { FolderFormHeader } from "@/components/dossiers/folder-form-header"
import { getFolder } from "@/components/dossiers/data"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const folder = getFolder(id)

  if (!folder) {
    notFound()
  }

  return (
    <>
      <FolderFormHeader mode="edit" />
      <FolderForm mode="edit" folder={folder} />
    </>
  )
}
