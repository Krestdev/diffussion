// UI-local shape used while editing a dossier's access grants in the
// create/edit form, before they're persisted via useSetDossierAccess.
export type FolderPermissionEntry = {
  userId: string
  userName: string
  canView: boolean
  canEdit: boolean
}
