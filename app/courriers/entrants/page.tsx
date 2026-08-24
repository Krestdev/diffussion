import { MailsMetrics } from "@/components/courriers/mails-metrics"
import { MailsPageHeader } from "@/components/courriers/mails-page-header"
import { MailsTable } from "@/components/courriers/mails-table"
import { ListPagination } from "@/components/shared/list-pagination"
import { ListToolbar } from "@/components/shared/list-toolbar"

export default function Page() {
  return (
    <>
      <MailsPageHeader />
      <MailsMetrics />
      <ListToolbar />
      <MailsTable />
      <ListPagination />
    </>
  )
}
