export type FolderConfidentiality = "public" | "restricted"

export type FolderPermission = {
  user: string
  canView: boolean
  canEdit: boolean
}

export type FolderFile = {
  name: string
  size: string
}

export type Folder = {
  id: string
  /** Short table code, e.g. "F-01". */
  code: string
  title: string
  lettersCount: number
  site: string
  type: string
  confidentiality: FolderConfidentiality
  createdAt: string
  updatedAt: string
  /** Long reference number shown in the detail dialog, e.g. "E-45898760057". */
  referenceNumber: string
  description: string
  responsible: string
  project: string
  createdBy: string
  files: FolderFile[]
  permissions: FolderPermission[]
  /** Total number of users granted access — can exceed the users listed in `permissions`. */
  authorizedCount: number
}
