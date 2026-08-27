import type { Role } from "../role/type"
import type { Site } from "../site/type"

export type AppUserStatus = "ACTIVE" | "SUSPENDED"

// The administration "Utilisateurs" resource — distinct from the
// currently-logged-in user's own profile (see hooks/auth).
export type AppUser = {
  id: string
  name: string
  email: string
  registrationNumber: string | null
  function: string | null
  phone: string | null
  status: AppUserStatus
  isVerified: boolean
  isConnected: boolean
  lastLogin: string | null
  createdAt: string
  updatedAt: string
  roles: Role[]
  sites: Site[]
}

export type CreateAppUserPayload = {
  name: string
  email: string
  password: string
  function?: string
  phone?: string
  roleIds?: string[]
  siteIds?: string[]
}

export type UpdateAppUserPayload = Partial<
  Omit<CreateAppUserPayload, "password">
> & { password?: string }
