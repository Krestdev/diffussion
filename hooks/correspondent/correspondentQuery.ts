import { BaseQuery } from "../baseQuery"
import type { Correspondent, CorrespondentPayload } from "./type"

class CorrespondentQuery extends BaseQuery<Correspondent, CorrespondentPayload> {
  constructor() {
    super("/correspondents")
  }
}

export const correspondentQuery = new CorrespondentQuery()
