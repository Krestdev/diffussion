"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import { RolePicker } from "@/components/utilisateurs/role-picker"
import type { AppUser } from "@/components/utilisateurs/types"

export function UserEditDialog({
  user,
  open,
  onOpenChange,
}: {
  user: AppUser
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [fullName, setFullName] = useState(user.fullName)
  const [email, setEmail] = useState(user.email)
  const [roles, setRoles] = useState<string[]>(user.roles)
  const [userFunction, setUserFunction] = useState(user.function)
  const [phone, setPhone] = useState(user.phone)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[560px] gap-0 rounded-2xl p-4"
      >
        <DialogGradientHeader
          title={user.fullName}
          subtitle="Modifier les informations relatives à un utilisateur"
          variant="secondary"
        />
        <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2">
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-medium text-[#18181b]">
              Nom complet <span className="text-[#dc2626]">*</span>
            </label>
            <Input
              required
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className="h-9 rounded border border-[#e4e4e7] px-4"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#18181b]">
              Adresse mail <span className="text-[#dc2626]">*</span>
            </label>
            <Input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-9 rounded border border-[#e4e4e7] px-4"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#18181b]">
              Rôle <span className="text-[#dc2626]">*</span>
            </label>
            <RolePicker roles={roles} onChange={setRoles} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#18181b]">
              Fonction
            </label>
            <Input
              value={userFunction}
              onChange={(event) => setUserFunction(event.target.value)}
              className="h-9 rounded border border-[#e4e4e7] px-4"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#18181b]">
              Numéro de téléphone
            </label>
            <Input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="+237"
              className="h-9 rounded border border-[#e4e4e7] px-4"
            />
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
