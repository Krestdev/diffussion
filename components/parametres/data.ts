import type {
  DocumentCategory,
  ValidationCircuit,
} from "@/components/parametres/types"

export const documentCategories: DocumentCategory[] = [
  {
    id: "cd-970-1",
    reference: "CD-970",
    label: "Légal",
    description: "-----",
    createdBy: "Jason Adiogo",
    createdAt: "23 Août 2026, 13:11",
    updatedAt: "27 Août 2026, 14:44",
  },
  {
    id: "cd-970-2",
    reference: "CD-970",
    label: "Rapports",
    description: "-----",
    createdBy: "Jason Adiogo",
    createdAt: "23 Août 2026, 13:11",
    updatedAt: "27 Août 2026, 14:44",
  },
  {
    id: "cd-970-3",
    reference: "CD-970",
    label: "CV & lettres de motivation",
    description: "-----",
    createdBy: "Jason Adiogo",
    createdAt: "23 Août 2026, 13:11",
    updatedAt: "27 Août 2026, 14:44",
  },
  {
    id: "cd-970-4",
    reference: "CD-970",
    label: "Contrats et documents juridiques",
    description: "-----",
    createdBy: "Jason Adiogo",
    createdAt: "23 Août 2026, 13:11",
    updatedAt: "27 Août 2026, 14:44",
  },
]

export function getDocumentCategory(id: string) {
  return documentCategories.find((category) => category.id === id)
}

export const validationCircuits: ValidationCircuit[] = [
  {
    id: "fw-68489-1",
    reference: "FW-68489",
    steps: [],
    nature: "Légal & Administratif",
    site: "Cristal",
    modifiedBy: "Jason Adiogo",
    createdAt: "20 Juin 2026, 12:16",
    updatedAt: "27 Août 2026, 14:44",
  },
  {
    id: "fw-68489-2",
    reference: "FW-68489",
    steps: ["Joseph FONKOU", "Manuella BELLO", "Éric Phillipe MBONGO"],
    nature: "Légal & Administratif",
    site: "Andromède",
    modifiedBy: "Jason Adiogo",
    createdAt: "20 Juin 2026, 12:16",
    updatedAt: "27 Août 2026, 14:44",
  },
]

export function getValidationCircuit(id: string) {
  return validationCircuits.find((circuit) => circuit.id === id)
}

export const circuitNatures = ["Légal & Administratif", "Type 1", "Type 2"]

export const circuitSites = ["Cristal", "Andromède", "Emeraude"]

export const circuitReviewers = [
  "Joseph FONKOU",
  "Manuella BELLO",
  "Éric Phillipe MBONGO",
  "Jason ADIOGO",
]
