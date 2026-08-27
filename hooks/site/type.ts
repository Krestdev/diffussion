export type SiteStatus = "ACTIVE" | "INACTIVE"

export type SiteResponsible = { id: string; name: string; email: string }

export type Site = {
  id: string
  code: string
  name: string
  city: string | null
  status: SiteStatus
  responsibleId: string | null
  responsible: SiteResponsible | null
  createdAt: string
  updatedAt: string
}

export type SitePayload = {
  name: string
  city?: string
  status?: SiteStatus
  responsibleId?: string
}
