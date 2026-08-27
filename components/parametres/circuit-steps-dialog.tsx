"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import { CircuitStepsManager } from "@/components/parametres/circuit-steps-manager"
import type { Circuit } from "@/hooks/circuit/type"

// Quick-access version opened from the circuits list row actions — the
// Circuit detail page renders CircuitStepsManager inline instead.
export function CircuitStepsDialog({
  circuit,
  open,
  onOpenChange,
}: {
  circuit: Circuit
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[640px] gap-0 rounded-2xl p-4"
      >
        <DialogGradientHeader
          title={circuit.name}
          subtitle="Étapes du circuit"
          variant="secondary"
        />
        <div className="py-4">
          <CircuitStepsManager circuitId={circuit.id} />
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
