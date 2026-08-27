"use client"

import { useMemo, useState } from "react"

import { OutgoingMailsTable } from "@/components/courriers-sortants/outgoing-mails-table"
import { StatusTabs } from "@/components/courriers-sortants/status-tabs"
import {
  statusGroups,
  type OutgoingMailStatusGroup,
} from "@/components/courriers-sortants/status-groups"
import { ListPagination } from "@/components/shared/list-pagination"
import { ListToolbar } from "@/components/shared/list-toolbar"
import { useCourriers } from "@/hooks/courrier/useCourrier"

export function OutgoingMailsBrowser() {
  const [status, setStatus] = useState<OutgoingMailStatusGroup>("pending")

  // The backend filters by a single status; fetch a broad SORTANT page and
  // group client-side into the 3 tabs this UI exposes.
  const { data, isLoading } = useCourriers({ direction: "SORTANT", take: 100 })

  const mails = useMemo(
    () =>
      (data?.data ?? []).filter((mail) =>
        statusGroups[status].includes(mail.status)
      ),
    [data, status]
  )

  const counts = useMemo(() => {
    const all = data?.data ?? []
    return {
      pending: all.filter((m) => statusGroups.pending.includes(m.status)).length,
      approved: all.filter((m) => statusGroups.approved.includes(m.status)).length,
      rejected: all.filter((m) => statusGroups.rejected.includes(m.status)).length,
    }
  }, [data])

  return (
    <>
      <StatusTabs value={status} onChange={setStatus} counts={counts} />
      <ListToolbar />
      <OutgoingMailsTable mails={mails} isLoading={isLoading} />
      <ListPagination total={mails.length} page={1} pageCount={1} />
    </>
  )
}
