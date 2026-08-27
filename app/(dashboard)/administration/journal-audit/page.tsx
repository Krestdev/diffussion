"use client"

import { AuditPageHeader } from "@/components/audit/audit-page-header"
import { AuditTable } from "@/components/audit/audit-table"
import { ListPagination } from "@/components/shared/list-pagination"
import { ListToolbar } from "@/components/shared/list-toolbar"
import { useActivityLogs } from "@/hooks/activity/useActivity"

export default function Page() {
  const { data } = useActivityLogs()

  return (
    <>
      <AuditPageHeader />
      <ListToolbar />
      <AuditTable />
      <ListPagination total={data?.total ?? 0} page={1} pageCount={1} />
    </>
  )
}
