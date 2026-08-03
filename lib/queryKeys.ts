export const queryKeys = {
  user: (...args: unknown[]) => ["user", ...args] as const,
} as const;
