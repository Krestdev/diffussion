import { BaseQuery } from "../baseQuery"
import type { AccessEntry, SetAccessPayload } from "../access/type"
import type { Courrier, CourrierPayload } from "./type"

class CourrierQuery extends BaseQuery<Courrier, CourrierPayload> {
  constructor() {
    super("/courriers")
  }

  transmit = (id: string) => this.action(id, "transmit")
  // Starts the courrier's validation Circuit — decisions on the resulting
  // CircuitInstance happen via hooks/circuitInstance, not here.
  submitForVerification = (id: string) => this.action(id, "submit-for-verification")
  send = (id: string) => this.action(id, "send")
  cancel = (id: string) => this.action(id, "cancel")
  close = (id: string) => this.action(id, "close")
  archive = (id: string) => this.action(id, "archive")
  unarchive = (id: string) => this.action(id, "unarchive")
  discharge = (id: string) => this.action(id, "discharge")

  // Circuit owner (10.6) — dedicated endpoint/authorization, not part of
  // the generic patch() (see UpdateMailDto).
  setOwner = async (id: string, ownerId: string): Promise<Courrier> => {
    const response = await this.api.patch(`${this.url}/${id}/owner`, { ownerId })
    return response.data
  }

  // Independent from the dossier's own access list — see AccessEntry.
  getAccess = async (id: string): Promise<AccessEntry[]> => {
    const response = await this.api.get(`${this.url}/${id}/access`)
    return response.data
  }

  setAccess = async (
    id: string,
    body: SetAccessPayload
  ): Promise<AccessEntry[]> => {
    const response = await this.api.put(`${this.url}/${id}/access`, body)
    return response.data
  }
}

export const courrierQuery = new CourrierQuery()
