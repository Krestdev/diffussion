import { BaseQuery } from "../baseQuery"
import type { AccessEntry, SetAccessPayload } from "../access/type"
import type { DocumentItem } from "./type"

class DocumentQuery extends BaseQuery<DocumentItem, never> {
  constructor() {
    super("/documents")
  }

  getDownloadUrl = async (id: string) => {
    const response = await this.api.get<{ url: string; expiresIn: number }>(
      `${this.url}/${id}/download-url`
    )
    return response.data
  }

  // Multipart upload — pass exactly one of dossierId/courrierId/livrableId,
  // matching the backend's UploadDocumentDto. Axios drops the instance's
  // default `Content-Type: application/json` for FormData bodies and lets
  // the browser set the multipart boundary itself.
  upload = async (
    file: File,
    owner: { dossierId?: string; courrierId?: string; livrableId?: string }
  ): Promise<DocumentItem> => {
    const formData = new FormData()
    formData.append("file", file)
    if (owner.dossierId) formData.append("dossierId", owner.dossierId)
    if (owner.courrierId) formData.append("courrierId", owner.courrierId)
    if (owner.livrableId) formData.append("livrableId", owner.livrableId)
    const response = await this.api.post(this.url, formData)
    return response.data
  }

  // Independent from its dossier's/courrier's own access list — see AccessEntry.
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

export const documentQuery = new DocumentQuery()
