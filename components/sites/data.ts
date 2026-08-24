import type { Site } from "@/components/sites/types"

export const users = [
  "Jason ADIOGO",
  "Socrate NZOGNING",
  "Walter White",
  "Bruno Malong",
] as const

export const sites: Site[] = [
  {
    id: "st-392",
    code: "ST-392",
    referenceNumber: "T-6899",
    name: "Cristal",
    city: "Douala",
    manager: "Jason ADIOGO",
    status: "active",
    folderCount: 94,
    employeeCount: 44,
    createdBy: "Jason Adiogo",
    createdAt: "20 Juin 2026, 12:16",
    updatedAt: "22 Juin 2026, 14:44",
  },
  {
    id: "st-067",
    code: "ST-067",
    referenceNumber: "T-4213",
    name: "Emeraude",
    city: "Yaoundé",
    manager: "Socrate NZOGNING",
    status: "active",
    folderCount: 31,
    employeeCount: 18,
    createdBy: "Jason Adiogo",
    createdAt: "3 Mai 2026, 09:02",
    updatedAt: "3 Mai 2026, 09:02",
  },
]

export function getSite(id: string) {
  return sites.find((site) => site.id === id)
}
