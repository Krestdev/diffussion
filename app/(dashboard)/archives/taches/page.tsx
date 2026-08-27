import { ArchivedTasksPageHeader } from "@/components/archives/archived-tasks-page-header"
import { ArchivedTasksTable } from "@/components/archives/archived-tasks-table"
import { ListPagination } from "@/components/shared/list-pagination"
import { ListToolbar } from "@/components/shared/list-toolbar"

export default function Page() {
  return (
    <>
      <ArchivedTasksPageHeader />
      <ListToolbar />
      <ArchivedTasksTable />
      <ListPagination total={6} page={1} pageCount={2} />
    </>
  )
}
