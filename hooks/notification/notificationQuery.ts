import api from "@/lib/axios"
import type { FindNotificationsParams, UserNotification } from "./type"

// Read/act-on-your-own-inbox only — Notification rows themselves are always
// server-created (circuit steps, task assignment/corrections), never posted
// by the frontend, so this doesn't extend BaseQuery's create/update shape.
class NotificationQuery {
  private url = "/notifications"

  getMine = async (params?: FindNotificationsParams): Promise<UserNotification[]> => {
    const response = await api.get(`${this.url}/me`, { params })
    return response.data
  }

  markRead = async (id: string): Promise<UserNotification> => {
    const response = await api.patch(`${this.url}/${id}/read`)
    return response.data
  }

  archive = async (id: string): Promise<UserNotification> => {
    const response = await api.patch(`${this.url}/${id}/archive`)
    return response.data
  }
}

export const notificationQuery = new NotificationQuery()
