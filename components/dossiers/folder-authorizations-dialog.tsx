"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import type { FolderPermission } from "@/components/dossiers/types"

export function FolderAuthorizationsDialog({
  permissions,
  onPermissionsChange,
  open,
  onOpenChange,
}: {
  permissions: FolderPermission[]
  onPermissionsChange: (permissions: FolderPermission[]) => void
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  function togglePermission(user: string, field: "canView" | "canEdit") {
    onPermissionsChange(
      permissions.map((permission) =>
        permission.user === user
          ? { ...permission, [field]: !permission[field] }
          : permission
      )
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[440px] gap-0 rounded-2xl p-4"
      >
        <DialogGradientHeader
          title="Autorisation"
          subtitle="Définir les autorisations sur le dossier"
          variant="secondary"
        />
        <div className="py-3">
          <div className="grid grid-cols-[1fr_80px_80px] border-b border-[#dfdfdf] py-1 text-sm font-semibold text-[#2f2f2f]">
            <p>Utilisateur</p>
            <p className="text-center">Voir</p>
            <p className="text-center">Modifier</p>
          </div>
          {permissions.map((permission) => (
            <div
              key={permission.user}
              className="grid grid-cols-[1fr_80px_80px] items-center py-2 text-sm font-medium text-[#2f2f2f]"
            >
              <p>{permission.user}</p>
              <div className="flex justify-center">
                <Checkbox
                  checked={permission.canView}
                  onCheckedChange={() =>
                    togglePermission(permission.user, "canView")
                  }
                />
              </div>
              <div className="flex justify-center">
                <Checkbox
                  checked={permission.canEdit}
                  onCheckedChange={() =>
                    togglePermission(permission.user, "canEdit")
                  }
                />
              </div>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button
            className="bg-[#700032] text-sm font-medium tracking-normal text-white normal-case hover:bg-[#700032]/90"
            onClick={() => onOpenChange(false)}
          >
            Enregistrer
          </Button>
          <Button
            variant="outline"
            className="text-sm font-medium tracking-normal normal-case"
            onClick={() => onOpenChange(false)}
          >
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
