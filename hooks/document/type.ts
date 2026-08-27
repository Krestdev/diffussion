export type DocumentItem = {
  id: string
  originalName: string
  storageKey: string
  mimeType: string | null
  sizeBytes: number | null
  dossierId: string | null
  courrierId: string | null
  livrableId: string | null
  uploadedById: string | null
  createdAt: string
  // Circuit owner (10.6) — can decide any step of a circuit started
  // directly on this document, regardless of role/site gating. May be
  // unset; completed later via useSetDocumentOwner.
  ownerId: string | null
}

export type FindDocumentsParams = {
  dossierId?: string
  courrierId?: string
  livrableId?: string
}
