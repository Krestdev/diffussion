import type { AuditLog } from "@/components/audit/types"

export const auditLogs: AuditLog[] = [
  {
    id: "m-61089-1",
    reference: "M-61089",
    action: "Modification",
    user: "Jason ADIOGO",
    entityType: "Tâche",
    objectReference: "T-0658",
    date: "23 Août 2026, 13:11",
  },
  {
    id: "m-61088-1",
    reference: "M-61088",
    action: "Création",
    user: "Joseph FONKOU",
    entityType: "Dossier",
    objectReference: "D-73204",
    date: "23 Août 2026, 12:47",
  },
  {
    id: "m-61087-1",
    reference: "M-61087",
    action: "Modification",
    user: "Jason ADIOGO",
    entityType: "Tâche",
    objectReference: "T-0658",
    date: "23 Août 2026, 11:32",
  },
  {
    id: "m-61086-1",
    reference: "M-61086",
    action: "Suppression",
    user: "Marie Christine KEMBA",
    entityType: "Courrier",
    objectReference: "CS-2210",
    date: "22 Août 2026, 17:05",
  },
  {
    id: "m-61085-1",
    reference: "M-61085",
    action: "Modification",
    user: "Bruno MALONG",
    entityType: "Requête",
    objectReference: "T-6899",
    date: "22 Août 2026, 15:40",
  },
  {
    id: "m-61084-1",
    reference: "M-61084",
    action: "Archivage",
    user: "Louise Sonia EBELLE",
    entityType: "Dossier",
    objectReference: "D-40118",
    date: "22 Août 2026, 09:58",
  },
  {
    id: "m-61083-1",
    reference: "M-61083",
    action: "Modification",
    user: "Jason ADIOGO",
    entityType: "Tâche",
    objectReference: "T-0658",
    date: "21 Août 2026, 16:22",
  },
]

export function getAuditLog(id: string) {
  return auditLogs.find((log) => log.id === id)
}
