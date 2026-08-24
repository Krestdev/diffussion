import type { OutgoingMail } from "@/components/courriers-sortants/types"

export const outgoingMailMetrics = {
  pending: 2,
  approved: 33,
  total: 35,
}

export const statusTabs: {
  value: OutgoingMail["status"]
  label: string
  count?: number
}[] = [
  { value: "pending", label: "En attente", count: 6 },
  { value: "approved", label: "Approuvés" },
  { value: "rejected", label: "Rejetés" },
]

export const natures = [
  "Administratif",
  "Correspondance",
  "Rapport",
  "Facture",
  "Contrat",
] as const

export const mailTypes = [
  "Demande",
  "Réponse",
  "Transmission",
  "Information",
] as const

export const documentCategories = [
  "Pièce jointe",
  "Justificatif",
  "Rapport",
  "Plan",
] as const

export const correspondents = [
  "Mac Computers",
  "Krest Holding",
  "Communauté urbaine de Douala",
  "67 Design & Build",
] as const

export const outgoingMails: OutgoingMail[] = [
  {
    id: "cc-156548",
    code: "CC-156548",
    subject: "Etude environnementale des facteurs géopolitiques associés",
    folder: "Immeuble Krest",
    correspondent: "Krest Holding",
    priority: "urgent",
    status: "pending",
    registeredAt: "24 Juillet 2026, 12:33",
    referenceNumber: "E-45898760057",
    nature: "Administratif",
    site: "Cristal",
    createdBy: "Jason Adiogo",
    updatedAt: "22 Juin 2026, 14:44",
    documents: [
      { name: "NomDuFichier1", type: "Fichier PDF" },
      { name: "NomDuFichier2", type: "Fichier PDF" },
    ],
  },
  {
    id: "cc-156601",
    code: "CC-156601",
    subject: "Réponse à la demande de prolongation du délai de livraison",
    folder: "Immeuble Krest - 67 Design",
    correspondent: "Mac Computers",
    priority: "normal",
    status: "approved",
    registeredAt: "20 Juillet 2026, 10:02",
    referenceNumber: "E-45898760112",
    nature: "Correspondance",
    site: "Cristal",
    createdBy: "Jason Adiogo",
    updatedAt: "20 Juillet 2026, 10:02",
    documents: [{ name: "NomDuFichier1", type: "Fichier PDF" }],
  },
]

export function getOutgoingMail(id: string) {
  return outgoingMails.find((mail) => mail.id === id)
}
