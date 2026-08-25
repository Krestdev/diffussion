import { ArchivedFoldersPageHeader } from "@/components/archives/archived-folders-page-header"
import { ArchivedFoldersTable } from "@/components/archives/archived-folders-table"
import { ListPagination } from "@/components/shared/list-pagination"
import { ListToolbar } from "@/components/shared/list-toolbar"

export default function Page() {
  return (
    <>
      <ArchivedFoldersPageHeader />
      <ListToolbar />
      <ArchivedFoldersTable />
      <ListPagination total={20} page={1} pageCount={1} />
    </>
  )
}
