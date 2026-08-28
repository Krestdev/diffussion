import { BaseQuery } from "../baseQuery"
import type {
  AssignInstructionPayload,
  CreateInstructionPayload,
  Instruction,
} from "./type"

class InstructionQuery extends BaseQuery<Instruction, CreateInstructionPayload> {
  constructor() {
    super("/instructions")
  }

  // RG-INS-002: only `assign` is a POST — the rest of the lifecycle actions
  // are PATCH on this resource.
  assign = (id: string, body: AssignInstructionPayload) =>
    this.action(id, "assign", body)

  private patchAction = async (id: string, action: string, body?: unknown) => {
    const response = await this.api.patch<Instruction>(
      `${this.url}/${id}/${action}`,
      body
    )
    return response.data
  }

  // Rejecting a task reassigns it in the same step — see RefuseInstructionDto.
  refuse = (id: string, body: { motif: string; newAssigneeId: string }) =>
    this.patchAction(id, "refuse", body)
  close = (id: string) => this.patchAction(id, "close")
  cancel = (id: string) => this.patchAction(id, "cancel")
}

export const instructionQuery = new InstructionQuery()
