import type { Mail } from "@/components/courriers/types"

export const mailMetrics = {
  total: 521,
  archived: 20,
}

export const users = [
  "Bruno Malong",
  "Christine Foka",
  "Jacques Messa",
  "Marie Christine Kemba",
  "Jean-Phillipe Kotto",
  "Louise Sonia Ebelle",
] as const

export const natures = [
  "Correspondance",
  "Rapport",
  "Facture",
  "Contrat",
  "Autre",
] as const

export const mailTypes = [
  "Demande",
  "Réponse",
  "Transmission",
  "Information",
] as const

export const priorities: { value: Mail["priority"]; label: string }[] = [
  { value: "urgent", label: "Urgent" },
  { value: "normal", label: "Normal" },
  { value: "faible", label: "Faible" },
]

export const documentCategories = [
  "Pièce jointe",
  "Justificatif",
  "Rapport",
  "Plan",
] as const

export const correspondents = [
  "Communauté urbaine de Douala",
  "67 Design & Build",
  "Bruno Malong",
  "Christine Foka",
] as const

export const generatedReferences = [
  "REF-2026-0142",
  "REF-2026-0143",
  "REF-2026-0144",
  "REF-2026-0145",
] as const

export const mails: Mail[] = [
  {
    id: "m-01",
    code: "M-01",
    subject: "Etude environnementale des facteurs géopolitiques associés",
    folder: "Immeuble Krest",
    priority: "urgent",
    registeredAt: "24 Juillet 2026, 12:33",
    correspondent: "Communauté urbaine de Douala",
    nature: "Rapport",
    type: "Réponse",
    originMail: undefined,
    completed: false,
    documents: [
      { name: "etude-environnementale.pdf", category: "Rapport" },
      { name: "annexes.pdf", category: "Pièce jointe" },
    ],
    tasks: [],
  },
  {
    id: "m-02",
    code: "M-02",
    subject: "Demande de prolongation du délai de livraison du chantier",
    folder: "Immeuble Krest - 67 Design",
    priority: "normal",
    registeredAt: "22 Juillet 2026, 09:12",
    correspondent: "67 Design & Build",
    nature: "Correspondance",
    type: "Demande",
    originMail: "M-01",
    completed: true,
    documents: [{ name: "demande-prolongation.pdf", category: "Justificatif" }],
    tasks: [],
  },
]

export function getMail(id: string) {
  return mails.find((mail) => mail.id === id)
}
