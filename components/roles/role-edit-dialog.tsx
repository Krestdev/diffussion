"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import { permissionOptions } from "@/components/roles/data"
import type { Role } from "@/components/roles/types"

export function RoleEditDialog({
  role,
  open,
  onOpenChange,
}: {
  role: Role
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [name, setName] = useState(role.name)
  const [permissions, setPermissions] = useState<string[]>(role.permissions)

  function togglePermission(permission: string, checked: boolean) {
    setPermissions((current) =>
      checked
        ? [...current, permission]
        : current.filter((item) => item !== permission)
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[500px] gap-0 rounded-2xl p-4"
      >
        <DialogGradientHeader
          title={role.name}
          subtitle="Modifier le rôle"
          variant="secondary"
        />
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#18181b]">
              Nom <span className="text-[#dc2626]">*</span>
            </label>
            <Input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="h-9 rounded border border-[#e4e4e7] px-4"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#18181b]">
              Permissions <span className="text-[#dc2626]">*</span>
            </label>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {permissionOptions.map((permission) => (
                <label
                  key={permission}
                  className="flex items-center gap-2 text-sm text-[#2f2f2f]"
                >
                  <Checkbox
                    checked={permissions.includes(permission)}
                    onCheckedChange={(checked) =>
                      togglePermission(permission, checked === true)
                    }
                  />
                  {permission}
                </label>
              ))}
            </div>
          </div>
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
            Annuler
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
