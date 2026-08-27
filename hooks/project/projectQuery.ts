import { BaseQuery } from "../baseQuery"
import type { Project, ProjectPayload } from "./type"

class ProjectQuery extends BaseQuery<Project, ProjectPayload> {
  constructor() {
    super("/projects")
  }
}

export const projectQuery = new ProjectQuery()
