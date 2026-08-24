export type AuditAction = "Création" | "Modification" | "Suppression" | "Archivage"

export type AuditEntityType = "Tâche" | "Dossier" | "Courrier" | "Requête"

export type AuditLog = {
  id: string
  /** Table reference, e.g. "M-61089". */
  reference: string
  action: AuditAction
  user: string
  entityType: AuditEntityType
  /** Reference of the affected object, e.g. "T-0658". */
  objectReference: string
  date: string
}
