export type SiteStatus = "active" | "inactive"

export type Site = {
  id: string
  /** Table code, also used as the detail reference, e.g. "ST-392". */
  code: string
  name: string
  city: string
  manager: string
  status: SiteStatus
  referenceNumber: string
  folderCount: number
  employeeCount: number
  createdBy: string
  createdAt: string
  updatedAt: string
}
