"use client"

import Link from "next/link"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { notificationMeta } from "@/components/notifications/notification-labels"
import { useMyNotifications } from "@/hooks/notification/useNotification"

export function NotificationsPanel() {
  const { data, isLoading } = useMyNotifications()
  const recent = (data ?? []).slice(0, 5)

  return (
    <Card className="gap-3 rounded-xl p-3 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-between px-1">
        <p className="text-base font-medium text-[#2f2f2f]">Notifications</p>
        <Link href="/notifications" className="text-xs font-medium text-[#700032] hover:underline">
          Voir tout
        </Link>
      </div>
      {isLoading ? (
        <p className="px-2 py-1.5 text-sm text-[#71717a]">Chargement…</p>
      ) : recent.length === 0 ? (
        <p className="px-2 py-1.5 text-sm text-[#71717a]">Aucune notification</p>
      ) : (
        <ul className="flex flex-col">
          {recent.map((entry) => {
            const meta = notificationMeta(entry.notification.type)
            const unread = entry.status === "NOT_READ"
            return (
              <li
                key={entry.notificationId}
                className={cn(
                  "flex flex-col gap-1 px-2 py-1.5",
                  unread && "bg-[#fafafa]",
                  meta.tone === "warning" && unread && "bg-[#fee2e2]"
                )}
              >
                <p
                  className={cn(
                    "text-sm font-medium",
                    meta.tone === "warning" ? "text-[#b91c1c]" : "text-[#2f2f2f]"
                  )}
                >
                  {entry.notification.message ?? meta.label}
                </p>
                <p className="text-xs text-[#52525b]">
                  {new Date(entry.notification.createdAt).toLocaleString("fr-FR")}
                </p>
              </li>
            )
          })}
        </ul>
      )}
    </Card>
  )
}
