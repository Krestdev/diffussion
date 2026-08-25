export type DocumentCategory = {
  id: string
  reference: string
  label: string
  description: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

export type ValidationCircuit = {
  id: string
  reference: string
  /** Ordered list of reviewers; empty means "Aucune" étape. */
  steps: string[]
  nature: string
  site: string
  modifiedBy: string
  createdAt: string
  updatedAt: string
}
