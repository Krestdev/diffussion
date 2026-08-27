import { CategoriesPageHeader } from "@/components/parametres/categories-page-header"
import { CategoriesTable } from "@/components/parametres/categories-table"
import { ListPagination } from "@/components/shared/list-pagination"
import { ListToolbar } from "@/components/shared/list-toolbar"

export default function Page() {
  return (
    <>
      <CategoriesPageHeader />
      <ListToolbar showFilters={false} />
      <CategoriesTable />
      <ListPagination total={12} page={1} pageCount={1} />
    </>
  )
}
