import {
  Briefcase,
  Calendar,
  CircleUserRound,
  Hash,
  Mail,
  MapPin,
  Phone,
  Shield,
  UserRound,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import { RoleBadge } from "@/components/utilisateurs/role-badge"
import { StatusBadge } from "@/components/utilisateurs/status-badge"
import type { AppUser } from "@/hooks/adminUser/type"

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

export function UserViewDialog({
  user,
  open,
  onOpenChange,
}: {
  user: AppUser
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[760px] gap-0 rounded-2xl p-4"
      >
        <DialogGradientHeader
          title={user.name}
          subtitle="Informations relatives à l’utilisateur"
        />
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 py-4">
          <InfoRow
            icon={Hash}
            label="Référence"
            value={
              <span className="rounded bg-[#f2cfde] px-1.5 py-0.5 text-[#2f2f2f]">
                {user.registrationNumber ?? "—"}
              </span>
            }
          />
          <InfoRow
            icon={CircleUserRound}
            label="Noms & prénoms"
            value={user.name}
          />
          <InfoRow icon={Mail} label="Adresse mail" value={user.email} />
          <InfoRow icon={Briefcase} label="Fonction" value={user.function ?? "—"} />
          <InfoRow
            icon={MapPin}
            label="Site"
            value={
              <div className="flex flex-wrap gap-1">
                {user.sites.map((site) => (
                  <span
                    key={site.id}
                    className="inline-flex h-[22px] items-center rounded-md border border-[#e4e4e7] bg-[#f4f4f5] px-2 py-0.5 text-sm font-medium text-[#52525b]"
                  >
                    {site.name}
                  </span>
                ))}
              </div>
            }
          />
          <InfoRow
            icon={Shield}
            label="Rôle"
            value={
              <div className="flex flex-wrap gap-1">
                {user.roles.map((role) => (
                  <RoleBadge key={role.id} role={role.name} />
                ))}
              </div>
            }
          />
          <InfoRow
            icon={UserRound}
            label="Statut"
            value={<StatusBadge status={user.status} />}
          />
          <InfoRow
            icon={Phone}
            label="Numéro de téléphone"
            value={user.phone || "--/--"}
          />
          <InfoRow
            icon={Calendar}
            label="Créé le"
            value={new Date(user.createdAt).toLocaleDateString("fr-FR")}
          />
          <InfoRow
            icon={Calendar}
            label="Modifié le"
            value={new Date(user.updatedAt).toLocaleDateString("fr-FR")}
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
