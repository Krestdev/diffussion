import { SitesPageHeader } from "@/components/sites/sites-page-header"
import { SitesTable } from "@/components/sites/sites-table"
import { ListPagination } from "@/components/shared/list-pagination"
import { ListToolbar } from "@/components/shared/list-toolbar"

export default function Page() {
  return (
    <>
      <SitesPageHeader />
      <ListToolbar />
      <SitesTable />
      <ListPagination total={2} page={1} pageCount={1} />
    </>
  )
}
