"use client"

import { CorrespondentsPageHeader } from "@/components/correspondants/correspondents-page-header"
import { CorrespondentsTable } from "@/components/correspondants/correspondents-table"
import { ListPagination } from "@/components/shared/list-pagination"
import { ListToolbar } from "@/components/shared/list-toolbar"
import { useCorrespondents } from "@/hooks/correspondent/useCorrespondent"

export default function Page() {
  const { data } = useCorrespondents()

  return (
    <>
      <CorrespondentsPageHeader />
      <ListToolbar />
      <CorrespondentsTable />
      <ListPagination total={data?.total ?? 0} page={1} pageCount={1} />
    </>
  )
}
