import { BaseQuery } from "../baseQuery"
import type { Category, CategoryPayload } from "./type"

class CategoryQuery extends BaseQuery<Category, CategoryPayload> {
  constructor() {
    super("/categories")
  }
}

export const categoryQuery = new CategoryQuery()
