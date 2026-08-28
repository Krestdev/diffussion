"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import { UserCombobox } from "@/components/shared/user-combobox"
import { useAdminUsers } from "@/hooks/adminUser/useAdminUser"

/**
 * Displays and reassigns a Courrier's/Document's circuit owner (10.6) — can
 * decide any step of its circuit regardless of role/site gating. The
 * backend enforces who may actually save a change here (the resource's
 * creator/uploader, its owning site's responsible, or a platform admin);
 * this control doesn't pre-filter for that, an unauthorized save just
 * surfaces as an error toast from the caller's mutation.
 */
export function CircuitOwnerRow({
  ownerId,
  onSetOwner,
  isSaving,
}: {
  ownerId: string | null
  onSetOwner: (ownerId: string) => void
  isSaving: boolean
}) {
  const { data: users } = useAdminUsers()
  const [open, setOpen] = useState(false)
  const [userName, setUserName] = useState("")
  const owner = users?.find((user) => user.id === ownerId)

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (next) setUserName(owner?.name ?? "")
  }

  function handleSave() {
    const user = users?.find((u) => u.name === userName)
    if (!user) return
    onSetOwner(user.id)
    setOpen(false)
  }

  return (
    <div className="flex items-center justify-between gap-2 border-t border-[#e4e4e7] pt-2 text-sm">
      <span className="text-[#52525b]">
        Propriétaire :{" "}
        <span className="font-medium text-[#2f2f2f]">
          {owner?.name ?? "Non défini"}
        </span>
      </span>
      <Button
        variant="outline"
        size="sm"
        className="text-xs font-medium normal-case"
        onClick={() => handleOpenChange(true)}
      >
        Modifier
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          showCloseButton={false}
          className="max-w-[440px] gap-0 rounded-2xl p-4"
        >
          <DialogGradientHeader
            title="Propriétaire"
            subtitle="Peut décider n'importe quelle étape du circuit, quel que soit le rôle requis"
            variant="secondary"
          />
          <div className="flex flex-col gap-1.5 py-3">
            <label className="text-sm font-medium text-[#18181b]">
              Utilisateur
            </label>
            <UserCombobox
              users={users?.map((user) => user.name) ?? []}
              value={userName}
              onChange={setUserName}
            />
          </div>
          <DialogFooter>
            <Button
              className="bg-[#700032] text-sm font-medium tracking-normal text-white normal-case hover:bg-[#700032]/90"
              disabled={!userName || isSaving}
              onClick={handleSave}
            >
              Enregistrer
            </Button>
            <Button
              variant="outline"
              className="text-sm font-medium tracking-normal normal-case"
              onClick={() => handleOpenChange(false)}
            >
              Annuler
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
