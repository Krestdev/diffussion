"use client"

import { useMemo, useState } from "react"

import { PageHeader } from "@/components/shared/page-header"
import { NotificationsList } from "@/components/notifications/notifications-list"
import { useMyNotifications } from "@/hooks/notification/useNotification"
import type { NotificationStatus } from "@/hooks/notification/type"

type Tab = "unread" | "all" | "archived"

const TAB_STATUS: Record<Tab, NotificationStatus | undefined> = {
  unread: "NOT_READ",
  all: undefined,
  archived: "ARCHIVED",
}

export default function Page() {
  const [tab, setTab] = useState<Tab>("unread")
  const { data, isLoading } = useMyNotifications()

  const all = useMemo(() => data ?? [], [data])
  const visible = useMemo(() => {
    const status = TAB_STATUS[tab]
    if (!status) return all.filter((n) => n.status !== "ARCHIVED")
    return all.filter((n) => n.status === status)
  }, [all, tab])
  const unreadCount = useMemo(
    () => all.filter((n) => n.status === "NOT_READ").length,
    [all]
  )

  return (
    <>
      <PageHeader
        title="Notifications"
        subtitle="Suivez les circuits et tâches qui attendent votre action"
        backHref="/"
      />

      <div className="flex w-fit items-center overflow-hidden rounded border border-[#dfdfdf] bg-white">
        <button
          onClick={() => setTab("unread")}
          className={
            tab === "unread"
              ? "flex min-h-9 items-center gap-2 bg-[#ffaf06] px-4 py-1"
              : "flex min-h-9 items-center px-4 py-1"
          }
        >
          <span className="text-sm font-semibold text-[#2f2f2f]">Non lues</span>
          {unreadCount > 0 && (
            <span className="flex min-w-[22px] items-center justify-center rounded bg-white p-1 text-xs font-semibold text-[#2f2f2f]">
              {unreadCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setTab("all")}
          className="flex min-h-9 items-center px-4 py-1 text-sm text-[#2f2f2f]"
        >
          Toutes
        </button>
        <button
          onClick={() => setTab("archived")}
          className="flex min-h-9 items-center px-4 py-1 text-sm text-[#2f2f2f]"
        >
          Archivées
        </button>
      </div>

      <NotificationsList notifications={visible} isLoading={isLoading} />
    </>
  )
}
