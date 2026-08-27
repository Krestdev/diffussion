import type { AccessEntry } from "@/hooks/access/type"

// A GrantAccessDialog only produces one new/updated entry — setAccess is
// full-replace, so it has to be merged into the resource's current list
// (replacing any existing grant for that user) before saving.
export function mergeAccessEntry(
  entries: AccessEntry[] | undefined,
  next: { userId: string; canView: boolean; canEdit: boolean }
) {
  const withoutTarget = (entries ?? [])
    .map(({ userId, canView, canEdit }) => ({ userId, canView, canEdit }))
    .filter((entry) => entry.userId !== next.userId)
  return [...withoutTarget, next]
}
