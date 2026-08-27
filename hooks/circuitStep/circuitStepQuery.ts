import { BaseQuery } from "../baseQuery"
import type { CircuitStep, CircuitStepPayload } from "../circuit/type"

class CircuitStepQuery extends BaseQuery<CircuitStep, CircuitStepPayload> {
  constructor() {
    super("/circuit-steps")
  }
}

export const circuitStepQuery = new CircuitStepQuery()
