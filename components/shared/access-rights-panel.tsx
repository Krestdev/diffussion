"use client"

import { useState } from "react"
import { ShieldCheck, UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { GrantAccessDialog } from "@/components/shared/grant-access-dialog"
import { mergeAccessEntry } from "@/lib/access"
import { useAdminUsers } from "@/hooks/adminUser/useAdminUser"
import type { AccessEntry } from "@/hooks/access/type"

type DraftEntry = {
  userId: string
  userName: string
  canView: boolean
  canEdit: boolean
}

/**
 * Editable access-grant panel for a dossier, courrier, or document. Each of
 * those has its own independent grant list (see AccessEntry) — the caller
 * fetches/saves via whichever resource-specific hook applies
 * (useDossierAccess/useCourrierAccess/useDocumentAccess and their
 * useSetXxxAccess counterparts) and passes the results in here.
 */
export function AccessRightsPanel({
  entries,
  isLoading,
  onSave,
  isSaving,
}: {
  entries: AccessEntry[] | undefined
  isLoading: boolean
  onSave: (entries: { userId: string; canView: boolean; canEdit: boolean }[]) => void
  isSaving: boolean
}) {
  const { data: users, isLoading: usersLoading } = useAdminUsers()
  const [grantOpen, setGrantOpen] = useState(false)

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-[#dfdfdf] p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-5 text-[#52525b]" />
          <p className="text-base font-semibold text-[#18181b]">
            Droits d&apos;accès
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="text-sm font-medium normal-case"
          onClick={() => setGrantOpen(true)}
        >
          <UserPlus className="size-4" />
          Ajouter
        </Button>
      </div>
      {(isLoading || usersLoading) && (
        <p className="text-sm text-[#71717a]">Chargement…</p>
      )}
      {!isLoading && !usersLoading && users && (
        <AccessRightsEditor
          // Remount (and rebuild the draft from fresh data) whenever the
          // saved grants actually change — including right after the quick
          // "Ajouter" dialog below saves one.
          key={entries?.map((e) => `${e.userId}:${e.canView}:${e.canEdit}`).join(",") ?? ""}
          users={users}
          entries={entries ?? []}
          onSave={onSave}
          isSaving={isSaving}
        />
      )}
      <GrantAccessDialog
        subtitle="Accorder l'accès à un utilisateur"
        open={grantOpen}
        onOpenChange={setGrantOpen}
        isPending={isSaving}
        onGrant={(entry) => {
          onSave(mergeAccessEntry(entries, entry))
          setGrantOpen(false)
        }}
      />
    </div>
  )
}

function AccessRightsEditor({
  users,
  entries,
  onSave,
  isSaving,
}: {
  users: { id: string; name: string }[]
  entries: AccessEntry[]
  onSave: (entries: { userId: string; canView: boolean; canEdit: boolean }[]) => void
  isSaving: boolean
}) {
  const [draft, setDraft] = useState<DraftEntry[]>(() => {
    const grants = new Map(entries.map((entry) => [entry.userId, entry]))
    return users.map((user) => {
      const grant = grants.get(user.id)
      return {
        userId: user.id,
        userName: user.name,
        canView: grant?.canView ?? false,
        canEdit: grant?.canEdit ?? false,
      }
    })
  })

  function toggle(userId: string, field: "canView" | "canEdit") {
    setDraft((current) =>
      current.map((entry) =>
        entry.userId === userId
          ? { ...entry, [field]: !entry[field] }
          : entry
      )
    )
  }

  function handleSave() {
    onSave(
      draft
        .filter((entry) => entry.canView || entry.canEdit)
        .map(({ userId, canView, canEdit }) => ({ userId, canView, canEdit }))
    )
  }

  if (draft.length === 0) {
    return <p className="text-sm text-[#71717a]">Aucun utilisateur.</p>
  }

  return (
    <>
      <div className="grid grid-cols-[1fr_80px_80px] gap-y-1.5 text-sm">
        <p className="font-semibold text-[#2f2f2f]">Utilisateur</p>
        <p className="text-center font-semibold text-[#2f2f2f]">Voir</p>
        <p className="text-center font-semibold text-[#2f2f2f]">Modifier</p>
        {draft.map((entry) => (
          <div key={entry.userId} className="contents">
            <p className="text-[#2f2f2f]">{entry.userName}</p>
            <div className="flex justify-center">
              <Checkbox
                checked={entry.canView}
                onCheckedChange={() => toggle(entry.userId, "canView")}
              />
            </div>
            <div className="flex justify-center">
              <Checkbox
                checked={entry.canEdit}
                onCheckedChange={() => toggle(entry.userId, "canEdit")}
              />
            </div>
          </div>
        ))}
      </div>
      <Button
        className="w-fit bg-[#700032] text-sm font-medium tracking-normal text-white normal-case hover:bg-[#700032]/90"
        disabled={isSaving}
        onClick={handleSave}
      >
        Enregistrer
      </Button>
    </>
  )
}
