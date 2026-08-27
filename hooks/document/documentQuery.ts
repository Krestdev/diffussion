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
  // matching the backend's UploadDocumentDto. The shared axios instance
  // sets a default `Content-Type: application/json` header (see
  // lib/axios.ts) — axios's transformRequest checks that header *before*
  // deciding how to serialize the body, so left as-is it silently
  // JSON.stringifies the FormData (dropping the actual file bytes) instead
  // of sending real multipart data, and the server sees no file at all.
  // Clearing it here for this one call is what actually lets axios pass
  // the FormData through untouched and the browser set the correct
  // `multipart/form-data; boundary=...` header itself.
  upload = async (
    file: File,
    owner: { dossierId?: string; courrierId?: string; livrableId?: string }
  ): Promise<DocumentItem> => {
    const formData = new FormData()
    formData.append("file", file)
    if (owner.dossierId) formData.append("dossierId", owner.dossierId)
    if (owner.courrierId) formData.append("courrierId", owner.courrierId)
    if (owner.livrableId) formData.append("livrableId", owner.livrableId)
    const response = await this.api.post(this.url, formData, {
      headers: { "Content-Type": undefined },
    })
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

  // Circuit owner (10.6) — dedicated endpoint/authorization.
  setOwner = async (id: string, ownerId: string): Promise<DocumentItem> => {
    const response = await this.api.patch(`${this.url}/${id}/owner`, { ownerId })
    return response.data
  }
}

export const documentQuery = new DocumentQuery()
