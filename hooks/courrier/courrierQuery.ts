import { BaseQuery } from "../baseQuery"
import type { AccessEntry, SetAccessPayload } from "../access/type"
import type { Courrier, CourrierPayload } from "./type"

class CourrierQuery extends BaseQuery<Courrier, CourrierPayload> {
  constructor() {
    super("/courriers")
  }

  transmit = (id: string) => this.action(id, "transmit")
  submitForVerification = (id: string) => this.action(id, "submit-for-verification")
  verify = (id: string, approved: boolean) =>
    this.action(id, "verify", { approved })
  validate = (id: string, approved: boolean, motif?: string) =>
    this.action(id, "validate", { approved, motif })
  send = (id: string) => this.action(id, "send")
  cancel = (id: string) => this.action(id, "cancel")
  close = (id: string) => this.action(id, "close")
  archive = (id: string) => this.action(id, "archive")
  unarchive = (id: string) => this.action(id, "unarchive")
  discharge = (id: string) => this.action(id, "discharge")

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
