import { BaseQuery } from "../baseQuery"
import type {
  CircuitInstance,
  DecideCircuitInstancePayload,
  EligibleCircuitOwners,
  StartCircuitInstancePayload,
} from "./type"

class CircuitInstanceQuery extends BaseQuery<
  CircuitInstance,
  StartCircuitInstancePayload
> {
  constructor() {
    super("/circuit-instances")
  }

  decide = (id: string, body: DecideCircuitInstancePayload) =>
    this.action(id, "decide", body)

  getEligibleOwners = async (dossierId: string): Promise<EligibleCircuitOwners> => {
    const response = await this.api.get(`${this.url}/eligible-owners`, {
      params: { dossierId },
    })
    return response.data
  }
}

export const circuitInstanceQuery = new CircuitInstanceQuery()
