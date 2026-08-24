import { FoldersMetrics } from "@/components/dossiers/folders-metrics"
import { FoldersPageHeader } from "@/components/dossiers/folders-page-header"
import { ListPagination } from "@/components/shared/list-pagination"
import { FoldersTable } from "@/components/dossiers/folders-table"
import { ListToolbar } from "@/components/shared/list-toolbar"

export default function Page() {
  return (
    <>
      <FoldersPageHeader />
      <FoldersMetrics />
      <ListToolbar />
      <FoldersTable />
      <ListPagination />
    </>
  )
}
