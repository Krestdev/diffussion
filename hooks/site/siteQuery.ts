import { BaseQuery } from "../baseQuery"
import type { Site, SitePayload } from "./type"

class SiteQuery extends BaseQuery<Site, SitePayload> {
  constructor() {
    super("/sites")
  }

  toggleStatus = (id: string) => this.action(id, "toggle-status")
}

export const siteQuery = new SiteQuery()
