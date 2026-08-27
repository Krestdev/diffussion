import { BaseQuery } from "../baseQuery"
import type { CorrespondentType } from "../correspondent/type"

class CorrespondentTypeQuery extends BaseQuery<CorrespondentType, { name: string }> {
  constructor() {
    super("/correspondent-types")
  }
}

export const correspondentTypeQuery = new CorrespondentTypeQuery()
