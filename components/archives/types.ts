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

export type ArchivedFolderFile = {
  name: string
  size: string
}

export type ArchivedFolder = {
  id: string
  /** Table code, e.g. "F-01". */
  code: string
  title: string
  mailsCount: number
  site: string
  type: string
  archivedAt: string
  archivedBy: string
  /** Long reference number shown in the detail dialog, e.g. "E-45898760057". */
  referenceNumber: string
  description: string
  responsible: string
  project: string
  files: ArchivedFolderFile[]
}
