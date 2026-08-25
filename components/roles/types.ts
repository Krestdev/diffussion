export type Role = {
  id: string
  /** Table code, e.g. "RO-05". */
  code: string
  name: string
  permissions: string[]
  usersCount: number
  createdBy: string
  createdAt: string
  updatedAt: string
}
