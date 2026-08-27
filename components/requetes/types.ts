import type { InstructionStatus } from "@/hooks/instruction/type"

export type RequestStatus = "en-attente" | "accepte" | "rejete"

// The Requêtes list simplifies the full Instruction state machine down to
// the 3 buckets this UI exposes: AFFECTEE is awaiting my decision, REFUSEE
// is a rejection, and everything past that point (EN_COURS and beyond)
// counts as accepted.
export function requestStatusBucket(status: InstructionStatus): RequestStatus {
  if (status === "AFFECTEE") return "en-attente"
  if (status === "REFUSEE") return "rejete"
  return "accepte"
}
