export type LivrableStatus =
  | "EN_PREPARATION"
  | "DEPOSE"
  | "SOUMIS"
  | "VALIDE"
  | "REJETE"

export type Deliverable = {
  id: string
  instructionId: string
  title: string
  description: string | null
  status: LivrableStatus
  version: number
  parentVersionId: string | null
  createdById: string | null
  createdAt: string
  updatedAt: string
}

export type CreateDeliverablePayload = {
  instructionId: string
  title: string
  description?: string
}

export type FindDeliverablesParams = {
  instructionId?: string
  status?: LivrableStatus
  skip?: number
  take?: number
}
