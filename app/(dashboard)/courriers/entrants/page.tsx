"use client"

import { MailsMetrics } from "@/components/courriers/mails-metrics"
import { MailsPageHeader } from "@/components/courriers/mails-page-header"
import { MailsTable } from "@/components/courriers/mails-table"
import { ListPagination } from "@/components/shared/list-pagination"
import { ListToolbar } from "@/components/shared/list-toolbar"
import { useCourriers } from "@/hooks/courrier/useCourrier"

export default function Page() {
  const { data } = useCourriers({ direction: "ENTRANT" })

  return (
    <>
      <MailsPageHeader />
      <MailsMetrics />
      <ListToolbar />
      <MailsTable />
      <ListPagination
        total={data?.total ?? 0}
        page={1}
        pageCount={Math.max(1, Math.ceil((data?.total ?? 0) / (data?.take ?? 20)))}
      />
    </>
  )
}
