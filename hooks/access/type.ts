// Shared shape for the per-user access grant lists on Dossier, Courrier, and
// Document. Each resource's list is independent — a grant on one is never
// inherited from, or propagated to, another (see the backend's schema.prisma
// comments on DossierAccess/CourrierAccess/DocumentAccess).
export type AccessUserRef = { id: string; name: string; email: string }

export type AccessEntry = {
  id: string
  userId: string
  canView: boolean
  canEdit: boolean
  createdAt: string
  updatedAt: string
  user: AccessUserRef
}

// Full-replace semantics: the entries listed become the complete grant set
// for the resource — any existing grant for a user not listed is removed.
export type SetAccessPayload = {
  entries: { userId: string; canView: boolean; canEdit: boolean }[]
}
