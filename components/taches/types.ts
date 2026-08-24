export type TaskPriority = "urgent" | "normal" | "moyen"

export type TaskStatus = "en-attente" | "a-corriger" | "termine"

export type TaskDeliverable = {
  /** Table position label, e.g. "Livrable 1". */
  label: string
  title: string
  status: TaskStatus
}

export type Task = {
  id: string
  /** Table code, e.g. "T-6899". */
  code: string
  title: string
  folder: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  supervisor: string
  dueDate: string
  createdBy: string
  createdAt: string
  updatedAt: string
  receivedAt: string
  deliverables: TaskDeliverable[]
}
