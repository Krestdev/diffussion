import type {
  ArchivedFolder,
  ArchivedMail,
  ArchivedTask,
} from "@/components/archives/types"

export const archivedFolders: ArchivedFolder[] = [
  {
    id: "f-01",
    code: "F-01",
    title: "Communauté urbaine de Douala",
    mailsCount: 153,
    site: "Cristal",
    type: "Type 1",
    archivedAt: "24 Juillet 2026, 12:33",
    archivedBy: "Jason Adiogo",
    referenceNumber: "E-20481093822",
    description:
      "Correspondances et courriers relatifs à la Communauté urbaine de Douala.",
    responsible: "Jordan Kenfack",
    project: "67 Design & Build",
    files: [],
  },
  {
    id: "f-02",
    code: "F-02",
    title: "Immeuble Krest - 67 Design",
    mailsCount: 36,
    site: "Cristal",
    type: "Type 2",
    archivedAt: "24 Juillet 2026, 12:33",
    archivedBy: "Jason Adiogo",
    referenceNumber: "E-45898760057",
    description:
      "Le service de terrassement nécessite un casque de sécurité pour tous les employés sur le site.",
    responsible: "Jordan Kenfack",
    project: "Construction du Viaduc sur la Sanaga",
    files: [
      { name: "NomDuFichier1", size: "2.45 Mo" },
      { name: "NomDuFichier2", size: "145 Ko" },
      { name: "Livrable 1", size: "1.20 Mo" },
      { name: "Livrable 2", size: "980 Ko" },
    ],
  },
]

export function getArchivedFolder(id: string) {
  return archivedFolders.find((folder) => folder.id === id)
}

export const archivedMails: ArchivedMail[] = [
  {
    id: "cc-98435-1",
    code: "CC-98435",
    subject: "Etude environnementale des facteurs géopolitiques associés",
    type: "entrant",
    folder: "Immeuble Krest",
    priority: "urgent",
    registeredAt: "24 Juillet 2026, 12:33",
  },
  {
    id: "cc-98435-2",
    code: "CC-98435",
    subject: "Etude environnementale des facteurs géopolitiques associés",
    type: "sortant",
    folder: "Immeuble Krest",
    priority: "normal",
    registeredAt: "24 Juillet 2026, 12:33",
  },
]

export const archivedTasks: ArchivedTask[] = [
  {
    id: "t-6899",
    code: "T-6899",
    title: "Demander l’offre financière au client",
    folder: "Immeuble Krest",
    priority: "urgent",
    archivedAt: "24 Juillet 2026, 12:33",
  },
  {
    id: "t-9630",
    code: "T-9630",
    title: "Préparer le bon de commande",
    folder: "Immeuble Krest",
    priority: "normal",
    archivedAt: "13 Juillet 2026, 22:10",
  },
  {
    id: "t-3304",
    code: "T-3304",
    title: "Soumettre le DAO",
    folder: "Chantier Port Autonome de Kribi",
    priority: "normal",
    archivedAt: "30 Juin 2026, 09:03",
  },
  {
    id: "t-6512",
    code: "T-6512",
    title: "Rapport de réunion",
    folder: "Explora",
    priority: "moyen",
    archivedAt: "29 Juin 2026, 15:43",
  },
  {
    id: "t-1003",
    code: "T-1003",
    title: "Demander l’offre financière au client",
    folder: "Centre commercial Bastos",
    priority: "urgent",
    archivedAt: "29 Juin 2026, 15:36",
  },
]
