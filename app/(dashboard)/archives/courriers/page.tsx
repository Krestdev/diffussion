"use client"

import { ArchivedMailsPageHeader } from "@/components/archives/archived-mails-page-header"
import { ArchivedMailsTable } from "@/components/archives/archived-mails-table"
import { ListPagination } from "@/components/shared/list-pagination"
import { ListToolbar } from "@/components/shared/list-toolbar"
import { useCourriers } from "@/hooks/courrier/useCourrier"

export default function Page() {
  const { data } = useCourriers({ status: "ARCHIVE" })

  return (
    <>
      <ArchivedMailsPageHeader />
      <ListToolbar />
      <ArchivedMailsTable />
      <ListPagination total={data?.total ?? 0} page={1} pageCount={1} />
    </>
  )
}
