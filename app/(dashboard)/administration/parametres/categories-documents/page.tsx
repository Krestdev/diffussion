"use client"

import { CategoriesPageHeader } from "@/components/parametres/categories-page-header"
import { CategoriesTable } from "@/components/parametres/categories-table"
import { ListPagination } from "@/components/shared/list-pagination"
import { ListToolbar } from "@/components/shared/list-toolbar"
import { useCategories } from "@/hooks/category/useCategory"

export default function Page() {
  const { data } = useCategories()

  return (
    <>
      <CategoriesPageHeader />
      <ListToolbar showFilters={false} />
      <CategoriesTable />
      <ListPagination total={data?.length ?? 0} page={1} pageCount={1} />
    </>
  )
}
