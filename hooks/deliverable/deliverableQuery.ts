import { BaseQuery } from "../baseQuery"
import type { CreateDeliverablePayload, Deliverable } from "./type"

class DeliverableQuery extends BaseQuery<Deliverable, CreateDeliverablePayload> {
  constructor() {
    super("/deliverables")
  }

  deposit = (id: string) => this.action(id, "deposit")
  submit = (id: string) => this.action(id, "submit")
  newVersion = (id: string, body: Partial<CreateDeliverablePayload>) =>
    this.action(id, "new-version", body)
}

export const deliverableQuery = new DeliverableQuery()
