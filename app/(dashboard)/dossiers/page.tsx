"use client"

import { FoldersMetrics } from "@/components/dossiers/folders-metrics"
import { FoldersPageHeader } from "@/components/dossiers/folders-page-header"
import { ListPagination } from "@/components/shared/list-pagination"
import { FoldersTable } from "@/components/dossiers/folders-table"
import { ListToolbar } from "@/components/shared/list-toolbar"
import { useDossiers } from "@/hooks/dossier/useDossier"

export default function Page() {
  const { data } = useDossiers()

  return (
    <>
      <FoldersPageHeader />
      <FoldersMetrics />
      <ListToolbar />
      <FoldersTable />
      <ListPagination
        total={data?.total ?? 0}
        page={1}
        pageCount={Math.max(1, Math.ceil((data?.total ?? 0) / (data?.take ?? 20)))}
      />
    </>
  )
}
