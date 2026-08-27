import { BaseQuery } from "../baseQuery"
import type { ActivityLog } from "./type"

// Read-only resource — the Journal d'audit screen never creates/edits logs.
class ActivityQuery extends BaseQuery<ActivityLog, never> {
  constructor() {
    super("/activity-logs")
  }
}

export const activityQuery = new ActivityQuery()
