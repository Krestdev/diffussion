import { CircuitsPageHeader } from "@/components/parametres/circuits-page-header"
import { CircuitsTable } from "@/components/parametres/circuits-table"
import { ListPagination } from "@/components/shared/list-pagination"
import { ListToolbar } from "@/components/shared/list-toolbar"

export default function Page() {
  return (
    <>
      <CircuitsPageHeader />
      <ListToolbar showFilters={false} />
      <CircuitsTable />
      <ListPagination total={2} page={1} pageCount={1} />
    </>
  )
}
