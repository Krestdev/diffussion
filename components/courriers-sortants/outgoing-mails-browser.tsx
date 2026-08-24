"use client"

import { useState } from "react"

import { outgoingMails } from "@/components/courriers-sortants/data"
import { OutgoingMailsTable } from "@/components/courriers-sortants/outgoing-mails-table"
import { StatusTabs } from "@/components/courriers-sortants/status-tabs"
import type { OutgoingMailStatus } from "@/components/courriers-sortants/types"
import { ListPagination } from "@/components/shared/list-pagination"
import { ListToolbar } from "@/components/shared/list-toolbar"

export function OutgoingMailsBrowser() {
  const [status, setStatus] = useState<OutgoingMailStatus>("pending")

  const filteredMails = outgoingMails.filter((mail) => mail.status === status)

  return (
    <>
      <StatusTabs value={status} onChange={setStatus} />
      <ListToolbar />
      <OutgoingMailsTable mails={filteredMails} />
      <ListPagination />
    </>
  )
}
