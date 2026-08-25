export type UserStatus = "actif" | "suspendu"

export type AppUser = {
  id: string
  /** Table code, e.g. "M-61089". */
  code: string
  fullName: string
  email: string
  function: string
  sites: string[]
  roles: string[]
  status: UserStatus
  phone: string
  createdBy: string
  createdAt: string
  updatedAt: string
}
