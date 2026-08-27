import { BaseQuery } from "../baseQuery"
import type { Role, RolePayload } from "./type"

class RoleQuery extends BaseQuery<Role, RolePayload> {
  constructor() {
    super("/roles")
  }
}

export const roleQuery = new RoleQuery()
