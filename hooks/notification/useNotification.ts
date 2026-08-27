import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/lib/queryKeys"
import { notificationQuery } from "./notificationQuery"
import type { FindNotificationsParams } from "./type"

// There's no live push for notifications (no socket gateway backs the
// Notification model yet) — polling on a short interval is the stand-in for
// "the bell updates on its own" until one exists.
const POLL_INTERVAL_MS = 30_000

export function useMyNotifications(params?: FindNotificationsParams) {
  return useQuery({
    queryKey: queryKeys.notification("me", params ?? {}),
    queryFn: () => notificationQuery.getMine(params),
    refetchInterval: POLL_INTERVAL_MS,
  })
}

function useInvalidateNotifications() {
  const queryClient = useQueryClient()
  return () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.notification() })
}

export function useMarkNotificationRead() {
  const invalidate = useInvalidateNotifications()
  return useMutation({
    mutationFn: (id: string) => notificationQuery.markRead(id),
    onSuccess: invalidate,
  })
}

export function useArchiveNotification() {
  const invalidate = useInvalidateNotifications()
  return useMutation({
    mutationFn: (id: string) => notificationQuery.archive(id),
    onSuccess: invalidate,
  })
}
