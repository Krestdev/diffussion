import { ArchivedMailsPageHeader } from "@/components/archives/archived-mails-page-header"
import { ArchivedMailsTable } from "@/components/archives/archived-mails-table"
import { ListPagination } from "@/components/shared/list-pagination"
import { ListToolbar } from "@/components/shared/list-toolbar"

export default function Page() {
  return (
    <>
      <ArchivedMailsPageHeader />
      <ListToolbar />
      <ArchivedMailsTable />
      <ListPagination total={20} page={1} pageCount={2} />
    </>
  )
}
