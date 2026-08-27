import { BaseQuery } from "../baseQuery"
import type { AppUser, CreateAppUserPayload } from "./type"

class AdminUserQuery extends BaseQuery<AppUser, CreateAppUserPayload> {
  constructor() {
    super("/users")
  }

  toggleStatus = (id: string) => this.action(id, "toggle-status")
}

export const adminUserQuery = new AdminUserQuery()
