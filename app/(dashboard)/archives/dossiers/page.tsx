"use client"

import { ArchivedFoldersPageHeader } from "@/components/archives/archived-folders-page-header"
import { ArchivedFoldersTable } from "@/components/archives/archived-folders-table"
import { ListPagination } from "@/components/shared/list-pagination"
import { ListToolbar } from "@/components/shared/list-toolbar"
import { useDossiers } from "@/hooks/dossier/useDossier"

export default function Page() {
  const { data } = useDossiers({ status: "ARCHIVED" })

  return (
    <>
      <ArchivedFoldersPageHeader />
      <ListToolbar />
      <ArchivedFoldersTable />
      <ListPagination total={data?.total ?? 0} page={1} pageCount={1} />
    </>
  )
}
