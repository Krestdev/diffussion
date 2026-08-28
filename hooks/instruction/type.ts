import type { Deliverable } from "../deliverable/type"

export type InstructionPriority = "URGENT" | "NORMAL" | "LOW"
export type InstructionStatus =
  | "A_AFFECTER"
  | "AFFECTEE"
  | "EN_COURS"
  | "REFUSEE"
  | "EN_ATTENTE_VALIDATION"
  | "A_CORRIGER"
  | "TERMINEE"
  | "ANNULEE"

export type InstructionAssigneeRole = "EXECUTANT" | "SUPERVISEUR"

export type InstructionAssignee = {
  userId: string
  instructionId: string
  role: InstructionAssigneeRole
  user: { id: string; name: string }
}

export type InstructionRef = { id: string; number: string; title: string }

export type Instruction = {
  id: string
  number: string
  dossierId: string
  courrierId: string | null
  title: string
  description: string | null
  priority: InstructionPriority
  dueDate: string | null
  status: InstructionStatus
  refusalReason: string | null
  createdById: string | null
  createdAt: string
  updatedAt: string
  closedAt: string | null
  assignees: InstructionAssignee[]
  livrables: Deliverable[]
  dossier: { id: string; number: string; title: string }
  courrier: { id: string; number: string; subject: string } | null
  // Sub-tasks: the parent task(s) this one depends on, and the task(s)
  // that depend on it in turn — a plain reference, no blocking is enforced.
  dependsOn: { dependsOn: InstructionRef }[]
  dependents: { instruction: InstructionRef }[]
}

export type CreateInstructionPayload = {
  dossierId: string
  courrierId?: string
  title: string
  description?: string
  priority?: InstructionPriority
  dueDate?: string
  executantIds?: string[]
  superviseurId?: string
  dependsOnId?: string
}

export type AssignInstructionPayload = {
  executantIds?: string[]
  superviseurId?: string
}

export type FindInstructionsParams = {
  dossierId?: string
  courrierId?: string
  assigneeId?: string
  status?: InstructionStatus
  skip?: number
  take?: number
}
