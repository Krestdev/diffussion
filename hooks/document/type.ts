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
}

export type FindDocumentsParams = {
  dossierId?: string
  courrierId?: string
  livrableId?: string
}
