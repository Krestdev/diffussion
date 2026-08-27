import type { CourrierStatus } from "@/hooks/courrier/type"

// The Sortants list simplifies the full Courrier state machine down to 3
// buckets for its status tabs.
export type OutgoingMailStatusGroup = "pending" | "approved" | "rejected"

export const statusGroups: Record<OutgoingMailStatusGroup, CourrierStatus[]> = {
  pending: ["BROUILLON", "EN_CIRCUIT"],
  approved: ["VALIDE", "PRET_A_ENVOYER", "ENVOYE"],
  rejected: ["A_CORRIGER", "ANNULE"],
}

export const statusGroupTabs: { value: OutgoingMailStatusGroup; label: string }[] = [
  { value: "pending", label: "En attente" },
  { value: "approved", label: "Approuvés" },
  { value: "rejected", label: "Rejetés" },
]
