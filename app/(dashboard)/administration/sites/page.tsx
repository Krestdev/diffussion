"use client"

import { SitesPageHeader } from "@/components/sites/sites-page-header"
import { SitesTable } from "@/components/sites/sites-table"
import { ListPagination } from "@/components/shared/list-pagination"
import { ListToolbar } from "@/components/shared/list-toolbar"
import { useSites } from "@/hooks/site/useSite"

export default function Page() {
  const { data } = useSites()

  return (
    <>
      <SitesPageHeader />
      <ListToolbar />
      <SitesTable />
      <ListPagination total={data?.length ?? 0} page={1} pageCount={1} />
    </>
  )
}
