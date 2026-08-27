import type { Priority } from "@/components/shared/priority-badge"

// Shared by Dossier and Instruction — both use the same URGENT/NORMAL/LOW
// enum on the backend. Maps it onto the shared PriorityBadge's French,
// lowercase variant. Courrier has no priority of its own, so it borrows its
// dossier's when displaying one.
export type UrgencyLevel = "URGENT" | "NORMAL" | "LOW"

export function toBadgePriority(priority: UrgencyLevel): Priority {
  switch (priority) {
    case "URGENT":
      return "urgent"
    case "LOW":
      return "faible"
    default:
      return "normal"
  }
}
