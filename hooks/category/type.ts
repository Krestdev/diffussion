export type Category = {
  id: string
  label: string
  code: string | null
  description: string | null
  /** RG-ARC-001: retention duration in months, inherited by dossiers of this category. */
  retentionMonths: number | null
  createdAt: string
  updatedAt: string
}

export type CategoryPayload = {
  label: string
  code?: string
  description?: string
  retentionMonths?: number
}
