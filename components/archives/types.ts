import type { Priority } from "@/components/shared/priority-badge"
import type { TaskPriority } from "@/components/taches/types"

export type ArchivedMailType = "entrant" | "sortant"

export type ArchivedMail = {
  id: string
  /** Table code, e.g. "CC-98435". */
  code: string
  subject: string
  type: ArchivedMailType
  folder: string
  priority: Priority
  registeredAt: string
}

export type ArchivedTask = {
  id: string
  /** Table code, e.g. "T-6899". */
  code: string
  title: string
  folder: string
  priority: TaskPriority
  archivedAt: string
}
