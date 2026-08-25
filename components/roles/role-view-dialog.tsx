import {
  Calendar,
  Hash,
  ShieldCheck,
  Users,
  UserRound,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import type { Role } from "@/components/roles/types"

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="flex gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f4f4f5]">
        <Icon className="size-6 text-[#52525b]" />
      </div>
      <div>
        <p className="text-sm text-[#52525b]">{label}</p>
        <div className="text-sm font-medium text-[#18181b]">{value}</div>
      </div>
    </div>
  )
}

export function RoleViewDialog({
  role,
  open,
  onOpenChange,
}: {
  role: Role
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[440px] gap-0 rounded-2xl p-4"
      >
        <DialogGradientHeader
          title={role.name}
          subtitle="Informations relatives au rôle"
        />
        <div className="flex flex-col gap-4 py-4">
          <InfoRow
            icon={Hash}
            label="Référence"
            value={
              <span className="rounded bg-[#f2cfde] px-1.5 py-0.5 text-[#2f2f2f]">
                {role.code}
              </span>
            }
          />
          <InfoRow icon={Users} label="Utilisateurs" value={role.usersCount} />
          <InfoRow
            icon={ShieldCheck}
            label="Permissions"
            value={
              <div className="flex flex-col gap-0.5">
                {role.permissions.map((permission) => (
                  <span key={permission}>{permission}</span>
                ))}
              </div>
            }
          />
          <InfoRow icon={UserRound} label="Créé par" value={role.createdBy} />
          <InfoRow icon={Calendar} label="Créé le" value={role.createdAt} />
          <InfoRow
            icon={Calendar}
            label="Modifié le"
            value={role.updatedAt}
          />
        </div>
        <DialogFooter>
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
