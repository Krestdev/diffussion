import {
  Calendar,
  Hash,
  Package,
  SquarePlay,
  UserRound,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import type { AuditLog } from "@/components/audit/types"

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
    <div className="flex gap-2">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#e4e4e7]">
        <Icon className="size-6 text-[#52525b]" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-[#52525b]">{label}</p>
        <div className="text-sm font-medium text-[#2f2f2f]">{value}</div>
      </div>
    </div>
  )
}

function ReferenceBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded bg-[#f2cfde] px-1.5 py-0.5 text-[#9e1351]">
      {children}
    </span>
  )
}

export function AuditViewDialog({
  log,
  open,
  onOpenChange,
}: {
  log: AuditLog
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
          title={`${log.action} - ${log.entityType.toLowerCase()}`}
          subtitle="Informations relatives à l’action"
        />
        <div className="flex flex-col gap-3 py-4">
          <InfoRow
            icon={Hash}
            label="Référence"
            value={<ReferenceBadge>{log.reference}</ReferenceBadge>}
          />
          <InfoRow icon={SquarePlay} label="Action" value={log.action} />
          <InfoRow icon={Package} label="Entité" value={log.entityType} />
          <InfoRow icon={UserRound} label="Effectué par" value={log.user} />
          <InfoRow
            icon={Hash}
            label="Référence de l’objet"
            value={<ReferenceBadge>{log.objectReference}</ReferenceBadge>}
          />
          <InfoRow icon={Calendar} label="Effectué le" value={log.date} />
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
