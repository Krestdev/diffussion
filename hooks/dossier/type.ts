import type { AccessEntry, SetAccessPayload } from "../access/type"
import type { DossierType } from "../dossierType/type"
import type { Project } from "../project/type"
import type { Site } from "../site/type"

// Category has no dedicated frontend resource yet (not surfaced in any
// Figma-derived form) — inlined here just for shape-fidelity on the
// dossier's populated `category` relation.
export type DossierCategory = { id: string; label: string }

export type DossierPriority = "URGENT" | "NORMAL" | "LOW"
export type DossierConfidentiality = "PUBLIC" | "RESTRICTED"
export type DossierStatus =
  | "OPEN"
  | "IN_PROGRESS"
  | "PENDING"
  | "LATE"
  | "CLOSED"
  | "ARCHIVED"

export type DossierUserRef = { id: string; name: string; email: string }

export type Dossier = {
  id: string
  number: string
  title: string
  description: string | null
  typeId: string | null
  categoryId: string | null
  projectId: string | null
  siteId: string
  responsibleId: string | null
  priority: DossierPriority
  confidentiality: DossierConfidentiality
  status: DossierStatus
  progress: number
  keywords: string[]
  openedAt: string
  closedAt: string | null
  archivedAt: string | null
  createdAt: string
  updatedAt: string
  site: Site
  type: DossierType | null
  category: DossierCategory | null
  project: Project | null
  responsible: DossierUserRef | null
  createdBy: DossierUserRef | null
  _count: { courriers: number; instructions: number }
}

export type DossierPayload = {
  title: string
  description?: string
  typeId?: string
  categoryId?: string
  projectId?: string
  siteId: string
  responsibleId?: string
  priority?: DossierPriority
  confidentiality?: DossierConfidentiality
  keywords?: string[]
}

export type FindDossiersParams = {
  search?: string
  status?: DossierStatus
  priority?: DossierPriority
  siteId?: string
  responsibleId?: string
  typeId?: string
  skip?: number
  take?: number
}

export type DossierAccessEntry = AccessEntry
export type SetDossierAccessPayload = SetAccessPayload
