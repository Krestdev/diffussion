import type { Priority } from "@/components/shared/priority-badge"

export type OutgoingMailStatus = "pending" | "approved" | "rejected"

export type OutgoingMailDocument = {
  name: string
  type: string
}

export type OutgoingMail = {
  id: string
  /** Table code, e.g. "CC-156548". */
  code: string
  subject: string
  folder: string
  correspondent: string
  priority: Priority
  status: OutgoingMailStatus
  registeredAt: string
  referenceNumber: string
  nature: string
  site: string
  createdBy: string
  updatedAt: string
  documents: OutgoingMailDocument[]
}
