import { RolesPageHeader } from "@/components/roles/roles-page-header"
import { RolesTable } from "@/components/roles/roles-table"
import { ListPagination } from "@/components/shared/list-pagination"
import { ListToolbar } from "@/components/shared/list-toolbar"

export default function Page() {
  return (
    <>
      <RolesPageHeader />
      <ListToolbar />
      <RolesTable />
      <ListPagination total={6} page={1} pageCount={1} />
    </>
  )
}
