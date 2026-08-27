"use client"

import Link from "next/link"
import { Archive, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { cn } from "@/lib/utils"
import { getApiErrorMessage } from "@/lib/apiError"
import { notificationMeta } from "@/components/notifications/notification-labels"
import {
  useArchiveNotification,
  useMarkNotificationRead,
} from "@/hooks/notification/useNotification"
import type { UserNotification } from "@/hooks/notification/type"

export function NotificationsList({
  notifications,
  isLoading,
}: {
  notifications: UserNotification[]
  isLoading: boolean
}) {
  const markRead = useMarkNotificationRead()
  const archive = useArchiveNotification()

  function handleMarkRead(id: string) {
    markRead.mutate(id, {
      onError: (error) =>
        toast.add({
          title: "Échec de l'opération",
          description: getApiErrorMessage(error, "Veuillez réessayer."),
          type: "error",
        }),
    })
  }

  function handleArchive(id: string) {
    archive.mutate(id, {
      onError: (error) =>
        toast.add({
          title: "Échec de l'opération",
          description: getApiErrorMessage(error, "Veuillez réessayer."),
          type: "error",
        }),
    })
  }

  if (isLoading) {
    return <p className="text-sm text-[#71717a]">Chargement…</p>
  }

  if (notifications.length === 0) {
    return (
      <p className="rounded-xl border border-[#dfdfdf] p-6 text-center text-sm text-[#71717a]">
        Aucune notification
      </p>
    )
  }

  return (
    <ul className="flex flex-col gap-2">
      {notifications.map((entry) => {
        const meta = notificationMeta(entry.notification.type)
        const unread = entry.status === "NOT_READ"
        return (
          <li
            key={entry.notificationId}
            className={cn(
              "flex items-start justify-between gap-4 rounded-xl border border-[#dfdfdf] p-4",
              unread && "bg-[#fafafa]"
            )}
          >
            <div className="flex flex-1 flex-col gap-1">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "text-[10px] font-semibold tracking-wide uppercase",
                    meta.tone === "warning"
                      ? "text-[#b91c1c]"
                      : meta.tone === "success"
                        ? "text-[#15803d]"
                        : "text-[#52525b]"
                  )}
                >
                  {meta.label}
                </span>
                {unread && (
                  <span className="size-1.5 shrink-0 rounded-full bg-[#9e1351]" />
                )}
              </div>
              <p className="text-sm font-medium text-[#18181b]">
                {entry.notification.message ?? meta.label}
              </p>
              <div className="flex items-center gap-2 text-xs text-[#71717a]">
                <span>{new Date(entry.notification.createdAt).toLocaleString("fr-FR")}</span>
                {entry.notification.dossierId && (
                  <>
                    <span>·</span>
                    <Link
                      href={`/dossiers/${entry.notification.dossierId}`}
                      className="font-medium text-[#700032] hover:underline"
                    >
                      Voir le dossier
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              {unread && (
                <Button
                  variant="outline"
                  size="icon-sm"
                  className="rounded"
                  disabled={markRead.isPending}
                  onClick={() => handleMarkRead(entry.notificationId)}
                  aria-label="Marquer comme lu"
                >
                  <Check className="size-4" />
                </Button>
              )}
              {entry.status !== "ARCHIVED" && (
                <Button
                  variant="outline"
                  size="icon-sm"
                  className="rounded"
                  disabled={archive.isPending}
                  onClick={() => handleArchive(entry.notificationId)}
                  aria-label="Archiver"
                >
                  <Archive className="size-4" />
                </Button>
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
