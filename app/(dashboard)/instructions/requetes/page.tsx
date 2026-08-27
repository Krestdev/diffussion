import { RequestsMetrics } from "@/components/requetes/requests-metrics"
import { RequestsPageHeader } from "@/components/requetes/requests-page-header"
import { RequestsTable } from "@/components/requetes/requests-table"
import { RequestsTabs } from "@/components/requetes/requests-tabs"
import { ListPagination } from "@/components/shared/list-pagination"
import { ListToolbar } from "@/components/shared/list-toolbar"

export default function Page() {
  return (
    <>
      <RequestsPageHeader />
      <RequestsMetrics />
      <RequestsTabs />
      <ListToolbar />
      <RequestsTable />
      <ListPagination total={6} page={1} pageCount={2} />
    </>
  )
}
