export type SiteStatus = "active" | "inactive"

export type Site = {
  id: string
  /** Table code, e.g. "ST-392". */
  code: string
  /** Long reference shown in the detail dialog, e.g. "T-6899". */
  referenceNumber: string
  name: string
  city: string
  manager: string
  status: SiteStatus
  folderCount: number
  employeeCount: number
  createdBy: string
  createdAt: string
  updatedAt: string
}
