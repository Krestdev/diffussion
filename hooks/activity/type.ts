export type ActivitySource = "USER" | "SYSTEM"
export type ActivityLevel = "info" | "warn" | "error"

export type ActivityLog = {
  id: string
  createdAt: string
  parentLogId: string | null
  userId: string | null
  actorLabel: string | null
  source: ActivitySource
  level: ActivityLevel
  action: string
  entityType: string | null
  entityId: string | null
  message: string | null
  stack: string | null
  metadata: Record<string, unknown> | null
}

export type FindActivityLogsParams = {
  search?: string
  source?: ActivitySource
  level?: ActivityLevel
  entityType?: string
  entityId?: string
  userId?: string
  skip?: number
  take?: number
}
