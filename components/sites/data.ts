import type { Site } from "@/components/sites/types"

export const users = [
  "Jason ADIOGO",
  "Socrate NZOGNING",
  "Joseph FONKOU",
  "Bruno Malong",
  "Marie Christine Kemba",
] as const

export const sites: Site[] = [
  {
    id: "st-392",
    code: "ST-392",
    name: "Cristal",
    city: "Douala",
    manager: "Jason ADIOGO",
    status: "active",
    referenceNumber: "ST-392",
    folderCount: 94,
    employeeCount: 44,
    createdBy: "Jason Adiogo",
    createdAt: "20 Juin 2026, 12:16",
    updatedAt: "22 Juin 2026, 14:44",
  },
  {
    id: "st-067",
    code: "ST-067",
    name: "Emeraude",
    city: "Yaoundé",
    manager: "Socrate NZOGNING",
    status: "active",
    referenceNumber: "ST-067",
    folderCount: 51,
    employeeCount: 19,
    createdBy: "Jason Adiogo",
    createdAt: "18 Juin 2026, 09:10",
    updatedAt: "19 Juin 2026, 11:05",
  },
]

export function getSite(id: string) {
  return sites.find((site) => site.id === id)
}
