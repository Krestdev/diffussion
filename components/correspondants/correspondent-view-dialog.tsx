import {
  BadgeQuestionMark,
  Building2,
  Calendar,
  CircleHelp,
  Hash,
  Mail,
  MapPin,
  Map,
  Phone,
  SquareUser,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import { CorrespondentStatusBadge } from "@/components/correspondants/correspondent-status-badge"
import type { Correspondent } from "@/hooks/correspondent/type"

function InfoRow({
  icon: Icon,
  label,
  value,
  span,
}: {
  icon: LucideIcon
  label: string
  value: React.ReactNode
  span?: boolean
}) {
  return (
    <div className={span ? "col-span-2 flex gap-3" : "flex gap-3"}>
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

export function CorrespondentViewDialog({
  correspondent,
  open,
  onOpenChange,
}: {
  correspondent: Correspondent
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[760px] gap-0 rounded-2xl p-4"
      >
        <DialogGradientHeader title={correspondent.name} subtitle="Correspondant" />
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 py-4">
          <InfoRow
            icon={Hash}
            label="Référence"
            value={
              <span className="rounded bg-[#f2cfde] px-1.5 py-0.5 text-[#2f2f2f]">
                {correspondent.code}
              </span>
            }
          />
          <InfoRow
            icon={Building2}
            label="Nom / Raison sociale"
            value={correspondent.name}
          />
          <InfoRow
            icon={BadgeQuestionMark}
            label="Type"
            value={correspondent.type?.name ?? "—"}
          />
          <InfoRow icon={Map} label="Ville" value={correspondent.city ?? "—"} />
          <InfoRow
            icon={SquareUser}
            label="Contact principal"
            value={correspondent.mainContact ?? "—"}
          />
          <InfoRow
            icon={Phone}
            label="Numéro de téléphone"
            value={correspondent.phone ?? "—"}
          />
          <InfoRow
            icon={MapPin}
            label="Adresse"
            value={correspondent.address || "--/--"}
          />
          <InfoRow
            icon={Mail}
            label="Adresse mail"
            value={correspondent.email || "--/--"}
          />
          <InfoRow
            icon={CircleHelp}
            label="Statut"
            value={<CorrespondentStatusBadge status={correspondent.status} />}
          />
          <InfoRow
            icon={Calendar}
            label="Créé le"
            value={new Date(correspondent.createdAt).toLocaleDateString("fr-FR")}
          />
          <InfoRow
            icon={Calendar}
            label="Modifié le"
            value={new Date(correspondent.updatedAt).toLocaleDateString("fr-FR")}
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
