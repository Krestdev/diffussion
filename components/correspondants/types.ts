export type Correspondent = {
  id: string
  /** Table code, e.g. "CP-098465". */
  code: string
  name: string
  type: string
  city: string
  mainContact: string
  phone: string
  address: string
  email: string
  mailsCount: number
  createdBy: string
  createdAt: string
  updatedAt: string
  lastCorrespondenceAt: string
}
