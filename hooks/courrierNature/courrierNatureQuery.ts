import { BaseQuery } from "../baseQuery"
import type { CourrierNature, CourrierNaturePayload } from "./type"

class CourrierNatureQuery extends BaseQuery<CourrierNature, CourrierNaturePayload> {
  constructor() {
    super("/courrier-natures")
  }
}

export const courrierNatureQuery = new CourrierNatureQuery()
