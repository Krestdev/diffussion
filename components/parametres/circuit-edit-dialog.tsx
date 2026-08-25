"use client"

import { useState } from "react"
import { Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import { circuitNatures, circuitReviewers } from "@/components/parametres/data"
import type { ValidationCircuit } from "@/components/parametres/types"

export function CircuitEditDialog({
  circuit,
  open,
  onOpenChange,
}: {
  circuit: ValidationCircuit
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [nature, setNature] = useState(circuit.nature)
  const [steps, setSteps] = useState(circuit.steps)
  const [nextReviewer, setNextReviewer] = useState("")

  function addStep() {
    if (!nextReviewer || steps.includes(nextReviewer)) return
    setSteps([...steps, nextReviewer])
    setNextReviewer("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[440px] gap-0 rounded-2xl p-4"
      >
        <DialogGradientHeader
          title={`${circuit.nature} (${circuit.site})`}
          subtitle="Modifier le circuit de validation"
        />
        <div className="flex flex-col gap-3 py-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#18181b]">
              Nature <span className="text-[#dc2626]">*</span>
            </label>
            <Select
              value={nature}
              onValueChange={(value) => setNature(value ?? "")}
              required
            >
              <SelectTrigger className="h-9 w-full rounded border border-[#e4e4e7] px-4">
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                {circuitNatures.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#18181b]">Étapes</label>
            <div className="flex items-center gap-2">
              <Select
                value={nextReviewer}
                onValueChange={(value) => setNextReviewer(value ?? "")}
              >
                <SelectTrigger className="h-9 w-full rounded border border-[#e4e4e7] px-4">
                  <SelectValue placeholder="Ajouter un rédacteur" />
                </SelectTrigger>
                <SelectContent>
                  {circuitReviewers
                    .filter((reviewer) => !steps.includes(reviewer))
                    .map((reviewer) => (
                      <SelectItem key={reviewer} value={reviewer}>
                        {reviewer}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="shrink-0 rounded"
                onClick={addStep}
              >
                <Plus className="size-4" />
                <span className="sr-only">Ajouter</span>
              </Button>
            </div>
            {steps.length > 0 && (
              <ul className="flex flex-col gap-1.5">
                {steps.map((step, index) => (
                  <li
                    key={step}
                    className="flex items-center justify-between rounded border border-[#e4e4e7] px-3 py-1.5 text-sm text-[#2f2f2f]"
                  >
                    <span>
                      {index + 1}. {step}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setSteps(steps.filter((reviewer) => reviewer !== step))
                      }
                      className="text-[#71717a] hover:text-[#dc2626]"
                    >
                      <X className="size-4" />
                      <span className="sr-only">Retirer</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
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
