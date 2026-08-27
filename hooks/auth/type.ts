export type LoginPayload = {
  email: string
  password: string
}

export type RegisterPayload = {
  name: string
  email: string
  password: string
}

export type AuthTokens = {
  accessToken: string
  refreshToken: string
}

export type AuthUserSite = {
  id: string
  name: string
  city: string | null
  status: "ACTIVE" | "INACTIVE"
}

// Shape returned by GET /auth/me — the backend's User model minus
// password/refreshToken, with roles flattened to names and permissions
// flattened to codes (see AuthService.me()).
export type AuthUser = {
  id: string
  name: string
  email: string
  registrationNumber: string | null
  function: string | null
  phone: string | null
  status: "ACTIVE" | "SUSPENDED"
  isVerified: boolean
  isConnected: boolean
  lastLogin: string | null
  createdAt: string
  updatedAt: string
  roles: string[]
  permissions: string[]
  sites: AuthUserSite[]
}
