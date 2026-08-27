export type CircuitStep = {
  id: string
  circuitId: string
  order: number
  actionType: string | null
  parentStepId: string | null
  maxDelayHours: number | null
  condition: string | null
  roleId: string | null
  role: { id: string; name: string } | null
}

export type Circuit = {
  id: string
  name: string
  dossierTypeId: string | null
  roleId: string | null
  createdAt: string
  updatedAt: string
  dossierType: { id: string; name: string } | null
  role: { id: string; name: string } | null
  steps: CircuitStep[]
}

export type CircuitPayload = {
  name: string
  dossierTypeId?: string
  roleId?: string
}

export type CircuitStepPayload = {
  circuitId: string
  order: number
  actionType?: string
  parentStepId?: string
  maxDelayHours?: number
  condition?: string
  roleId?: string
}
