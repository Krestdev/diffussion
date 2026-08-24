import type { OutgoingMail } from "@/components/courriers-sortants/types"

/**
 * Queue-level totals shown on the Approbation summary cards.
 * Intentionally independent from `pendingApprovals.length` below,
 * matching the convention in components/courriers/data.ts (mailMetrics
 * vs. the seeded `mails` array).
 */
export const approvalQueueMetrics = {
  pending: 8,
  accepted: 94,
  rejected: 22,
}

/** Mails currently awaiting approval, shown in the Approbation queue. */
export const pendingApprovals: OutgoingMail[] = [
  {
    id: "m-9806",
    code: "M-9806",
    subject: "Etude environnementale des facteurs géopolitiques associés",
    folder: "Immeuble Krest",
    correspondent: "Mac Computers",
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
    id: "m-6589",
    code: "M-6589",
    subject: "Factures Port Autonome de Kribi",
    folder: "PAK",
    correspondent: "Port Autonome de Kribi",
    priority: "normal",
    status: "pending",
    registeredAt: "23 Juillet 2026, 12:33",
    referenceNumber: "E-31207744418",
    nature: "Facture",
    site: "Cristal",
    createdBy: "Jason Adiogo",
    updatedAt: "23 Juillet 2026, 12:33",
    documents: [{ name: "facture-pak.pdf", type: "Fichier PDF" }],
  },
  {
    id: "m-9025",
    code: "M-9025",
    subject: "Décomptes avancement Voie sur berge",
    folder: "Voie sur Berge",
    correspondent: "67 Design & Build",
    priority: "urgent",
    status: "pending",
    registeredAt: "23 Juillet 2026, 12:33",
    referenceNumber: "E-58821093342",
    nature: "Rapport",
    site: "Cristal",
    createdBy: "Jason Adiogo",
    updatedAt: "23 Juillet 2026, 12:33",
    documents: [{ name: "decompte-avancement.pdf", type: "Fichier PDF" }],
  },
]
