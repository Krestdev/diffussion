import type { Folder } from "@/components/dossiers/types"

export const folderMetrics = {
  total: 113,
  archived: 9,
}

export const users = [
  "Bruno Malong",
  "Christine Foka",
  "Jacques Messa",
  "Marie Christine Kemba",
  "Jean-Phillipe Kotto",
  "Louise Sonia Ebelle",
] as const

export const folderTypes = ["Type 1", "Type 2", "Type 3"] as const
export const sites = ["Cristal"] as const
export const projects = [
  "Construction du Viaduc sur la Sanaga",
  "67 Design & Build",
] as const

export const folders: Folder[] = [
  {
    id: "f-01",
    code: "F-01",
    title: "Communauté urbaine de Douala",
    lettersCount: 153,
    site: "Cristal",
    type: "Type 1",
    confidentiality: "public",
    createdAt: "24 Juillet 2026, 12:33",
    updatedAt: "24 Juillet 2026, 12:33",
    referenceNumber: "E-20481093822",
    description:
      "Correspondances et courriers relatifs à la Communauté urbaine de Douala.",
    responsible: "Jordan Kenfack",
    project: "67 Design & Build",
    createdBy: "Jason Adiogo",
    files: [],
    permissions: users.map((user, index) => ({
      user,
      canView: index < 4,
      canEdit: index < 2,
    })),
    authorizedCount: 8,
  },
  {
    id: "f-02",
    code: "F-02",
    title: "Immeuble Krest - 67 Design",
    lettersCount: 36,
    site: "Cristal",
    type: "Type 2",
    confidentiality: "restricted",
    createdAt: "24 Juillet 2026, 12:33",
    updatedAt: "22 Juin 2026, 14:44",
    referenceNumber: "E-45898760057",
    description:
      "Le service de terrassement nécessite un casque de sécurité pour tous les employés sur le site.",
    responsible: "Jordan Kenfack",
    project: "Construction du Viaduc sur la Sanaga",
    createdBy: "Jason Adiogo",
    files: [
      { name: "Plan du 2e etage.pdf", size: "2.45 Mo" },
      { name: "Rapport Juin.doc", size: "145 Ko" },
    ],
    permissions: [
      { user: "Bruno Malong", canView: true, canEdit: false },
      { user: "Christine Foka", canView: true, canEdit: true },
      { user: "Jacques Messa", canView: true, canEdit: true },
      { user: "Marie Christine Kemba", canView: true, canEdit: true },
      { user: "Jean-Phillipe Kotto", canView: false, canEdit: false },
      { user: "Louise Sonia Ebelle", canView: false, canEdit: false },
    ],
    authorizedCount: 13,
  },
]

export function getFolder(id: string) {
  return folders.find((folder) => folder.id === id)
}
