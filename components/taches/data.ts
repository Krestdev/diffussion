import type { Task } from "@/components/taches/types"

export const taskMetrics = {
  inProgress: 6,
  completed: 64,
}

export const tasks: Task[] = [
  {
    id: "t-6899",
    code: "T-6899",
    title: "Demander l’offre financière au client",
    folder: "Immeuble Krest",
    description:
      "Le service de terrassement nécessite un casque de sécurité pour tous les employés sur le site.",
    status: "en-attente",
    priority: "urgent",
    supervisor: "Walter White",
    dueDate: "14 Juillet 2026",
    createdBy: "Jason Adiogo",
    createdAt: "20 Juin 2026, 12:16",
    updatedAt: "22 Juin 2026, 14:44",
    receivedAt: "24 Juillet 2026, 12:33",
    deliverables: [
      { label: "Livrable 1", title: "Offre financière", status: "en-attente" },
      { label: "Livrable 2", title: "Décharge", status: "en-attente" },
    ],
  },
  {
    id: "t-9630",
    code: "T-9630",
    title: "Préparer le bon de commande",
    folder: "Immeuble Krest",
    description:
      "Bon de commande à préparer pour la livraison du matériel de chantier.",
    status: "a-corriger",
    priority: "normal",
    supervisor: "Walter White",
    dueDate: "18 Juillet 2026",
    createdBy: "Jason Adiogo",
    createdAt: "10 Juillet 2026, 10:02",
    updatedAt: "12 Juillet 2026, 08:30",
    receivedAt: "13 Juillet 2026, 22:10",
    deliverables: [
      { label: "Livrable 1", title: "Bon de commande", status: "a-corriger" },
    ],
  },
  {
    id: "t-3304",
    code: "T-3304",
    title: "Soumettre le DAO",
    folder: "Chantier Port Autonome de Kribi",
    description:
      "Dossier d’appel d’offres à soumettre avant la date limite fixée par le client.",
    status: "en-attente",
    priority: "normal",
    supervisor: "Marie Christine Kemba",
    dueDate: "5 Juillet 2026",
    createdBy: "Bruno Malong",
    createdAt: "25 Juin 2026, 09:40",
    updatedAt: "28 Juin 2026, 11:15",
    receivedAt: "30 Juin 2026, 09:03",
    deliverables: [
      {
        label: "Livrable 1",
        title: "Dossier d’appel d’offres",
        status: "en-attente",
      },
    ],
  },
  {
    id: "t-6512",
    code: "T-6512",
    title: "Rapport de réunion",
    folder: "Explora",
    description:
      "Compte-rendu de la réunion de chantier hebdomadaire à rédiger et diffuser.",
    status: "en-attente",
    priority: "moyen",
    supervisor: "Christine Foka",
    dueDate: "3 Juillet 2026",
    createdBy: "Jean-Phillipe Kotto",
    createdAt: "27 Juin 2026, 16:00",
    updatedAt: "28 Juin 2026, 09:20",
    receivedAt: "29 Juin 2026, 15:43",
    deliverables: [
      {
        label: "Livrable 1",
        title: "Compte-rendu de réunion",
        status: "en-attente",
      },
    ],
  },
  {
    id: "t-1003",
    code: "T-1003",
    title: "Demander l’offre financière au client",
    folder: "Centre commercial Bastos",
    description:
      "Offre financière à demander avant le lancement des travaux de finition.",
    status: "a-corriger",
    priority: "urgent",
    supervisor: "Louise Sonia Ebelle",
    dueDate: "2 Juillet 2026",
    createdBy: "Jason Adiogo",
    createdAt: "26 Juin 2026, 14:10",
    updatedAt: "27 Juin 2026, 08:55",
    receivedAt: "29 Juin 2026, 15:36",
    deliverables: [
      { label: "Livrable 1", title: "Offre financière", status: "a-corriger" },
    ],
  },
  {
    id: "t-4521",
    code: "T-4521",
    title: "Vérifier la conformité du chantier",
    folder: "Chantier Port Autonome de Kribi",
    description:
      "Contrôle de conformité à réaliser avant la réception provisoire des travaux.",
    status: "en-attente",
    priority: "moyen",
    supervisor: "Marie Christine Kemba",
    dueDate: "1 Juillet 2026",
    createdBy: "Bruno Malong",
    createdAt: "24 Juin 2026, 13:05",
    updatedAt: "25 Juin 2026, 10:40",
    receivedAt: "26 Juin 2026, 11:20",
    deliverables: [
      {
        label: "Livrable 1",
        title: "Rapport de conformité",
        status: "en-attente",
      },
    ],
  },
]

export function getTask(id: string) {
  return tasks.find((task) => task.id === id)
}
