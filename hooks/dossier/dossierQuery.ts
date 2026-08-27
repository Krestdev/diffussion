import { BaseQuery } from "../baseQuery"
import type {
  Dossier,
  DossierAccessEntry,
  DossierPayload,
  SetDossierAccessPayload,
} from "./type"

class DossierQuery extends BaseQuery<Dossier, DossierPayload> {
  constructor() {
    super("/dossiers")
  }

  close = (id: string) => this.action(id, "close")
  reopen = (id: string) => this.action(id, "reopen")
  archive = (id: string) => this.action(id, "archive")
  unarchive = (id: string) => this.action(id, "unarchive")

  getAccess = async (id: string): Promise<DossierAccessEntry[]> => {
    const response = await this.api.get(`${this.url}/${id}/access`)
    return response.data
  }

  setAccess = async (
    id: string,
    body: SetDossierAccessPayload
  ): Promise<DossierAccessEntry[]> => {
    const response = await this.api.put(`${this.url}/${id}/access`, body)
    return response.data
  }
}

export const dossierQuery = new DossierQuery()
