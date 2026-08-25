import {
  Building,
  Calendar,
  Hash,
  UserRound,
  Workflow,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import type { ValidationCircuit } from "@/components/parametres/types"

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

export function CircuitViewDialog({
  circuit,
  open,
  onOpenChange,
}: {
  circuit: ValidationCircuit
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
          title={`${circuit.nature} (${circuit.site})`}
          subtitle="Circuit de validation"
        />
        <div className="flex flex-col gap-4 py-4">
          <InfoRow
            icon={Hash}
            label="Référence"
            value={
              <span className="rounded bg-[#f2cfde] px-1.5 py-0.5 text-[#2f2f2f]">
                {circuit.reference}
              </span>
            }
          />
          <InfoRow
            icon={Workflow}
            label="Étapes"
            value={
              circuit.steps.length > 0 ? circuit.steps.join(" → ") : "Aucune"
            }
          />
          <InfoRow icon={Building} label="Site" value={circuit.site} />
          <InfoRow
            icon={UserRound}
            label="Modifié par"
            value={circuit.modifiedBy}
          />
          <InfoRow icon={Calendar} label="Créé le" value={circuit.createdAt} />
          <InfoRow
            icon={Calendar}
            label="Modifié le"
            value={circuit.updatedAt}
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
