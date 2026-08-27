import { BaseQuery } from "../baseQuery"
import type { Canal, CanalPayload } from "./type"

class CanalQuery extends BaseQuery<Canal, CanalPayload> {
  constructor() {
    super("/canaux")
  }
}

export const canalQuery = new CanalQuery()
