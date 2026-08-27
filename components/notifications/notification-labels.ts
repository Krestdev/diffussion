// Maps the free-form `Notification.type` strings the backend writes (see
// CircuitInstanceService/InstructionsService) to a French display label and
// tone. Falls back to the raw type for anything not listed here — the
// backend is free to introduce new event types without the frontend
// breaking, just showing an untranslated one until this map catches up.
export type NotificationTone = "info" | "success" | "warning"

const NOTIFICATION_META: Record<string, { label: string; tone: NotificationTone }> = {
  CIRCUIT_STEP_PENDING: { label: "Action requise", tone: "warning" },
  CIRCUIT_COMPLETED: { label: "Circuit validé", tone: "success" },
  CIRCUIT_STEP_REJECTED: { label: "Étape rejetée", tone: "warning" },
  CIRCUIT_CANCELLED: { label: "Corrections demandées", tone: "warning" },
  TASK_ASSIGNED: { label: "Tâche assignée", tone: "info" },
  TASK_CORRECTIONS_REQUESTED: { label: "Corrections demandées", tone: "warning" },
}

export function notificationMeta(type: string) {
  return NOTIFICATION_META[type] ?? { label: type, tone: "info" as NotificationTone }
}
