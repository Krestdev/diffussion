import { BaseQuery } from "../baseQuery"
import type { Permission } from "./type"

class PermissionQuery extends BaseQuery<
  Permission,
  { code: string; description?: string }
> {
  constructor() {
    super("/permissions")
  }
}

export const permissionQuery = new PermissionQuery()
