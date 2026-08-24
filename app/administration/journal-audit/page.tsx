import { AuditPageHeader } from "@/components/audit/audit-page-header"
import { AuditTable } from "@/components/audit/audit-table"
import { ListPagination } from "@/components/shared/list-pagination"
import { ListToolbar } from "@/components/shared/list-toolbar"

export default function Page() {
  return (
    <>
      <AuditPageHeader />
      <ListToolbar />
      <AuditTable />
      <ListPagination total={64} page={1} pageCount={5} />
    </>
  )
}
