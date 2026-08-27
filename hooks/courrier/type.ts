import type { Correspondent } from "../correspondent/type"
import type { DossierPriority } from "../dossier/type"
import type { Canal } from "../canal/type"
import type { CourrierNature } from "../courrierNature/type"

export type CourrierDirection = "ENTRANT" | "SORTANT"

export type CourrierStatus =
  | "RECU"
  | "ENREGISTRE"
  | "TRANSMIS"
  | "EN_TRAITEMENT"
  | "EN_ATTENTE"
  | "BROUILLON"
  | "EN_CIRCUIT"
  | "A_CORRIGER"
  | "VALIDE"
  | "PRET_A_ENVOYER"
  | "ENVOYE"
  | "ANNULE"
  | "CLOTURE"
  | "ARCHIVE"

export type CourrierDossierRef = {
  id: string
  number: string
  title: string
  priority: DossierPriority
}

export type Courrier = {
  id: string
  number: string
  dossierId: string
  direction: CourrierDirection
  correspondentId: string | null
  natureId: string | null
  canalId: string | null
  subject: string
  reference: string | null
  status: CourrierStatus
  copies: number | null
  receivedAt: string | null
  sentAt: string | null
  scanUrl: string | null
  dischargeRequested: boolean
  dischargedAt: string | null
  dischargedById: string | null
  dischargedStamp: boolean
  createdById: string | null
  createdAt: string
  updatedAt: string
  // Circuit owner (10.6) — can decide any step of this courrier's circuit
  // regardless of role/site gating. May be unset; completed later via
  // useSetCourrierOwner by the creator, the site responsible, or a
  // platform admin.
  ownerId: string | null
  owner: { id: string; name: string; email: string } | null
  dossier: CourrierDossierRef
  correspondent: Correspondent | null
  nature: CourrierNature | null
  canal: Canal | null
}

export type CourrierPayload = {
  dossierId: string
  direction: CourrierDirection
  subject: string
  correspondentId?: string
  natureId?: string
  canalId?: string
  reference?: string
  copies?: number
  receivedAt?: string
  scanUrl?: string
  // Circuit owner (10.6), settable at creation only — see
  // useSetCourrierOwner for reassigning it afterwards.
  ownerId?: string
}

export type FindCourriersParams = {
  dossierId?: string
  direction?: CourrierDirection
  status?: CourrierStatus
  correspondentId?: string
  skip?: number
  take?: number
}
