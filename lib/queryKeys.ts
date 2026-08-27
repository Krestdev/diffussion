export const queryKeys = {
  auth: {
    me: () => ["auth", "me"] as const,
  },
  site: (...args: unknown[]) => ["site", ...args] as const,
  correspondent: (...args: unknown[]) => ["correspondent", ...args] as const,
  correspondentType: (...args: unknown[]) =>
    ["correspondentType", ...args] as const,
  role: (...args: unknown[]) => ["role", ...args] as const,
  permission: (...args: unknown[]) => ["permission", ...args] as const,
  user: (...args: unknown[]) => ["user", ...args] as const,
  dossier: (...args: unknown[]) => ["dossier", ...args] as const,
  dossierType: (...args: unknown[]) => ["dossierType", ...args] as const,
  project: (...args: unknown[]) => ["project", ...args] as const,
  document: (...args: unknown[]) => ["document", ...args] as const,
  courrier: (...args: unknown[]) => ["courrier", ...args] as const,
  canal: (...args: unknown[]) => ["canal", ...args] as const,
  courrierNature: (...args: unknown[]) => ["courrierNature", ...args] as const,
  instruction: (...args: unknown[]) => ["instruction", ...args] as const,
  deliverable: (...args: unknown[]) => ["deliverable", ...args] as const,
  activityLog: (...args: unknown[]) => ["activityLog", ...args] as const,
  category: (...args: unknown[]) => ["category", ...args] as const,
  circuit: (...args: unknown[]) => ["circuit", ...args] as const,
  circuitStep: (...args: unknown[]) => ["circuitStep", ...args] as const,
  circuitInstance: (...args: unknown[]) =>
    ["circuitInstance", ...args] as const,
  notification: (...args: unknown[]) => ["notification", ...args] as const,
} as const
