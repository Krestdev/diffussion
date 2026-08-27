"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import { UserCombobox } from "@/components/shared/user-combobox"
import { useAdminUsers } from "@/hooks/adminUser/useAdminUser"

/**
 * Quick "grant one user access" dialog — reusable for a dossier, a
 * courrier, or a document. The caller supplies `onGrant`, which should
 * merge the picked entry into that resource's full access list and save it
 * (each resource's access list is independent — see AccessEntry).
 */
export function GrantAccessDialog({
  title = "Accorder l'accès",
  subtitle,
  open,
  onOpenChange,
  onGrant,
  isPending,
}: {
  title?: string
  subtitle: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onGrant: (entry: { userId: string; canView: boolean; canEdit: boolean }) => void
  isPending?: boolean
}) {
  const { data: users } = useAdminUsers()
  const [userName, setUserName] = useState("")
  const [canView, setCanView] = useState(true)
  const [canEdit, setCanEdit] = useState(false)

  function reset() {
    setUserName("")
    setCanView(true)
    setCanEdit(false)
  }

  function handleOpenChange(next: boolean) {
    if (!next) reset()
    onOpenChange(next)
  }

  function handleGrant() {
    const user = users?.find((u) => u.name === userName)
    if (!user) return
    onGrant({ userId: user.id, canView, canEdit })
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[440px] gap-0 rounded-2xl p-4"
      >
        <DialogGradientHeader title={title} subtitle={subtitle} variant="secondary" />
        <div className="flex flex-col gap-3 py-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#18181b]">
              Utilisateur <span className="text-[#dc2626]">*</span>
            </label>
            <UserCombobox
              users={users?.map((u) => u.name) ?? []}
              value={userName}
              onChange={setUserName}
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-[#2f2f2f]">
              <Checkbox
                checked={canView}
                onCheckedChange={(checked) => setCanView(checked === true)}
              />
              Voir
            </label>
            <label className="flex items-center gap-2 text-sm text-[#2f2f2f]">
              <Checkbox
                checked={canEdit}
                onCheckedChange={(checked) => setCanEdit(checked === true)}
              />
              Modifier
            </label>
          </div>
        </div>
        <DialogFooter>
          <Button
            className="bg-[#700032] text-sm font-medium tracking-normal text-white normal-case hover:bg-[#700032]/90"
            disabled={!userName || isPending}
            onClick={handleGrant}
          >
            Accorder
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
  )
}
