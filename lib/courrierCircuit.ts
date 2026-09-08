import type { Courrier, CourrierDirection, CourrierStatus } from "@/hooks/courrier/type"

// Mirrors MailService's CIRCUIT_ELIGIBLE_STATUSES exactly — submitForVerification()
// (the only way to start a courrier's circuit) only accepts these statuses,
// per direction. Kept in one place so the entrant/sortant detail pages and
// CircuitInstancePanel can't drift out of sync with each other or the backend.
export const CIRCUIT_ELIGIBLE_STATUSES: Record<CourrierDirection, CourrierStatus[]> = {
  SORTANT: ["BROUILLON", "A_CORRIGER"],
  ENTRANT: ["TRANSMIS", "EN_TRAITEMENT", "A_CORRIGER"],
}

export function canSubmitCourrierForCircuit(
  courrier: Pick<Courrier, "direction" | "status">
) {
  return CIRCUIT_ELIGIBLE_STATUSES[courrier.direction].includes(courrier.status)
}
