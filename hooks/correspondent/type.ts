export type CorrespondentStatus = "ACTIVE" | "INACTIVE"

export type CorrespondentType = {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export type Correspondent = {
  id: string
  code: string
  name: string
  typeId: string | null
  type: CorrespondentType | null
  address: string | null
  city: string | null
  country: string | null
  email: string | null
  phone: string | null
  mainContact: string | null
  status: CorrespondentStatus
  createdAt: string
  updatedAt: string
}

export type CorrespondentPayload = {
  name: string
  typeId?: string
  address?: string
  city?: string
  country?: string
  email?: string
  phone?: string
  mainContact?: string
  status?: CorrespondentStatus
}

export type FindCorrespondentsParams = {
  search?: string
  typeId?: string
  city?: string
  status?: CorrespondentStatus
  skip?: number
  take?: number
}
