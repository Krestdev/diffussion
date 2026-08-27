import { BaseQuery } from "../baseQuery"
import type { Circuit, CircuitPayload } from "./type"

class CircuitQuery extends BaseQuery<Circuit, CircuitPayload> {
  constructor() {
    super("/circuits")
  }
}

export const circuitQuery = new CircuitQuery()
