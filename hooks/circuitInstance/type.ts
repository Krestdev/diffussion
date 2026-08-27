export type CircuitInstanceStatus = "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
export type ValidationDecision = "VALIDE" | "REJETE" | "CORRECTIONS_DEMANDEES"

export type CircuitInstanceStep = {
  id: string
  order: number
  actionType: string | null
  parentStepId: string | null
  maxDelayHours: number | null
  condition: string | null
  roleId: string | null
  role: { id: string; name: string } | null
}

export type CircuitInstanceStepHistoryEntry = {
  id: string
  enteredAt: string
  circuitStep: CircuitInstanceStep
}

export type CircuitInstanceValidation = {
  id: string
  decision: ValidationDecision
  motif: string | null
  decidedAt: string
  validator: { id: string; name: string }
}

export type CircuitInstance = {
  id: string
  circuitId: string
  // Derived from courrier/document's own dossier — never itself a valid
  // start target, see CircuitInstancePanel. Kept for the Dossier page's
  // read-only cross-courrier/document circuit summary.
  dossierId: string | null
  courrierId: string | null
  documentId: string | null
  currentStepId: string
  status: CircuitInstanceStatus
  completedAt: string | null
  circuit: {
    id: string
    name: string
    dossierType: { id: string; name: string } | null
    role: { id: string; name: string } | null
    steps: CircuitInstanceStep[]
  }
  currentStep: CircuitInstanceStep
  // Present regardless of target type (courrier or document) — prefer this
  // over courrier.dossier when rendering a dossier/priority column across
  // both target types uniformly.
  dossier: {
    id: string
    number: string
    title: string
    priority: "URGENT" | "NORMAL" | "LOW"
  } | null
  courrier: {
    id: string
    number: string
    subject: string
    direction: "ENTRANT" | "SORTANT"
    createdAt: string
    ownerId: string | null
    dossier: {
      id: string
      number: string
      title: string
      priority: "URGENT" | "NORMAL" | "LOW"
    }
  } | null
  document: {
    id: string
    originalName: string
    ownerId: string | null
    dossierId: string | null
    courrierId: string | null
    createdAt: string
  } | null
  stepHistory: CircuitInstanceStepHistoryEntry[]
  validations: CircuitInstanceValidation[]
}

// A circuit attaches to a courrier or a document, never a bare dossier —
// see CircuitInstancePanel and CircuitInstanceService.start().
export type StartCircuitInstancePayload = {
  circuitId?: string
  courrierId?: string
  documentId?: string
}

export type DecideCircuitInstancePayload = {
  decision: ValidationDecision
  motif?: string
}

export type FindCircuitInstancesParams = {
  dossierId?: string
  courrierId?: string
  documentId?: string
  status?: CircuitInstanceStatus
}

// GET /circuit-instances/eligible-owners?dossierId= — who can be picked as
// the circuit owner (10.6) for a courrier/document about to be created
// against this dossier. `users` is empty (not an error) when the dossier's
// type has no circuit configured yet, or that circuit has no role
// requirement — ownership can still be completed later.
export type EligibleCircuitOwners = {
  circuit: { id: string; name: string } | null
  users: { id: string; name: string; email: string }[]
}
