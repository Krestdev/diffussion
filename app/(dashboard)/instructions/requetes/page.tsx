"use client"

import { useMemo, useState } from "react"

import { RequestsMetrics } from "@/components/requetes/requests-metrics"
import { RequestsPageHeader } from "@/components/requetes/requests-page-header"
import { RequestsTable } from "@/components/requetes/requests-table"
import { RequestsTabs } from "@/components/requetes/requests-tabs"
import { requestStatusBucket, type RequestStatus } from "@/components/requetes/types"
import { ListPagination } from "@/components/shared/list-pagination"
import { ListToolbar } from "@/components/shared/list-toolbar"
import { useCurrentUser } from "@/hooks/auth/useAuth"
import { useInstructions } from "@/hooks/instruction/useInstruction"

export default function Page() {
  const [status, setStatus] = useState<RequestStatus>("en-attente")
  const { data: me } = useCurrentUser()
  const { data, isLoading } = useInstructions({
    assigneeId: me?.id,
    take: 100,
  })

  const all = useMemo(() => data?.data ?? [], [data])
  const filtered = useMemo(
    () => all.filter((request) => requestStatusBucket(request.status) === status),
    [all, status]
  )
  const pendingCount = useMemo(
    () => all.filter((r) => requestStatusBucket(r.status) === "en-attente").length,
    [all]
  )
  const acceptedCount = useMemo(
    () => all.filter((r) => requestStatusBucket(r.status) === "accepte").length,
    [all]
  )
  const rejectedCount = useMemo(
    () => all.filter((r) => requestStatusBucket(r.status) === "rejete").length,
    [all]
  )

  return (
    <>
      <RequestsPageHeader />
      <RequestsMetrics accepted={acceptedCount} rejected={rejectedCount} />
      <RequestsTabs value={status} onChange={setStatus} pendingCount={pendingCount} />
      <ListToolbar />
      <RequestsTable requests={filtered} isLoading={isLoading} />
      <ListPagination total={filtered.length} page={1} pageCount={1} />
    </>
  )
}
