import type { InstructionStatus } from "@/hooks/instruction/type"

export type TaskStatus = "en-attente" | "a-corriger" | "termine"

// The Tâches list simplifies the full Instruction state machine down to the
// 3 buckets this UI exposes.
export function taskStatusBucket(status: InstructionStatus): TaskStatus {
  if (status === "A_CORRIGER") return "a-corriger"
  if (status === "TERMINEE") return "termine"
  return "en-attente"
}

// Top-level tab grouping: "terminées" is a strict subset of the buckets
// above, everything else (including a-corriger) still counts as "en cours".
export function isTaskInProgress(status: InstructionStatus): boolean {
  return status !== "TERMINEE" && status !== "ANNULEE"
}

