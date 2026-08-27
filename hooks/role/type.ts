import type { Permission } from "../permission/type"

export type Role = {
  id: string
  code: string
  name: string
  description: string | null
  createdAt: string
  updatedAt: string
  permissions: Permission[]
  usersCount: number
}

export type RolePayload = {
  name: string
  description?: string
  permissionIds?: string[]
}
