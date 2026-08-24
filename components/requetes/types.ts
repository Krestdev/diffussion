export type RequestPriority = "urgent" | "normal" | "faible"

export type RequestStatus = "en-attente" | "accepte" | "rejete"

export type RequestDeliverable = {
  /** Table position label, e.g. "Livrable 1". */
  label: string
  title: string
  status: RequestStatus
}

export type Request = {
  id: string
  /** Table code, e.g. "T-6899". */
  code: string
  title: string
  folder: string
  description: string
  status: RequestStatus
  priority: RequestPriority
  supervisor: string
  dueDate: string
  createdBy: string
  createdAt: string
  updatedAt: string
  receivedAt: string
  deliverables: RequestDeliverable[]
}
