import type { Role } from "@/components/roles/types"

export const permissionOptions = [
  "Créer un courrier",
  "Recevoir un courrier",
  "Supprimer un courrier",
  "Supprimer un dossier",
  "Voir les archives",
  "Assigner une tâche",
] as const

export const roles: Role[] = [
  {
    id: "ro-05",
    code: "RO-05",
    name: "Exécutant",
    permissions: [
      "Créer un courrier",
      "Recevoir un courrier",
      "Voir les archives",
    ],
    usersCount: 22,
    createdBy: "Jason Adiogo",
    createdAt: "23 Août 2026, 13:11",
    updatedAt: "23 Août 2026, 13:11",
  },
  {
    id: "ro-04",
    code: "RO-04",
    name: "Administrateur",
    permissions: [
      "Créer un courrier",
      "Recevoir un courrier",
      "Supprimer un courrier",
      "Supprimer un dossier",
      "Voir les archives",
      "Assigner une tâche",
    ],
    usersCount: 6,
    createdBy: "Jason Adiogo",
    createdAt: "22 Août 2026, 09:54",
    updatedAt: "22 Août 2026, 09:54",
  },
  {
    id: "ro-03",
    code: "RO-03",
    name: "Dispatcheur",
    permissions: ["Recevoir un courrier", "Assigner une tâche"],
    usersCount: 4,
    createdBy: "Jason Adiogo",
    createdAt: "23 Janvier 2026, 12:44",
    updatedAt: "23 Janvier 2026, 12:44",
  },
  {
    id: "ro-02",
    code: "RO-02",
    name: "Validateur",
    permissions: ["Recevoir un courrier", "Voir les archives"],
    usersCount: 8,
    createdBy: "Jason Adiogo",
    createdAt: "23 Janvier 2026, 14:52",
    updatedAt: "23 Janvier 2026, 14:52",
  },
  {
    id: "ro-01",
    code: "RO-01",
    name: "Rédacteur",
    permissions: ["Créer un courrier"],
    usersCount: 44,
    createdBy: "Jason Adiogo",
    createdAt: "23 Janvier 2026, 13:11",
    updatedAt: "23 Janvier 2026, 13:11",
  },
  {
    id: "ro-00",
    code: "RO-00",
    name: "Agent de réception",
    permissions: ["Recevoir un courrier"],
    usersCount: 5,
    createdBy: "Jason Adiogo",
    createdAt: "24 Janvier 2026, 08:33",
    updatedAt: "24 Janvier 2026, 08:33",
  },
]

export function getRole(id: string) {
  return roles.find((role) => role.id === id)
}
