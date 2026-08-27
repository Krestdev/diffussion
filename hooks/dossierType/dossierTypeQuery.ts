import { BaseQuery } from "../baseQuery"
import type { DossierType, DossierTypePayload } from "./type"

class DossierTypeQuery extends BaseQuery<DossierType, DossierTypePayload> {
  constructor() {
    super("/dossier-types")
  }
}

export const dossierTypeQuery = new DossierTypeQuery()
