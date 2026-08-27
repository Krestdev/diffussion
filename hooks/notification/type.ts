export type NotificationCanal = "IN_APP" | "EMAIL" | "WHATSAPP"
export type NotificationStatus = "NOT_READ" | "READ" | "ARCHIVED"

export type NotificationItem = {
  id: string
  dossierId: string | null
  courrierId: string | null
  type: string
  message: string | null
  canal: NotificationCanal
  createdAt: string
}

// A user's own inbox row: one fan-out link (UserNotification) carrying its
// individual read/archived status, plus the shared Notification content.
export type UserNotification = {
  userId: string
  notificationId: string
  status: NotificationStatus
  notification: NotificationItem
}

export type FindNotificationsParams = {
  status?: NotificationStatus
}
