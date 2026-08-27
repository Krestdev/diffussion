"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import { toast } from "@/components/ui/toast"
import { getApiErrorMessage } from "@/lib/apiError"
import { useAcceptInstruction } from "@/hooks/instruction/useInstruction"
import type { Instruction } from "@/hooks/instruction/type"

export function RequestAcceptDialog({
  request,
  open,
  onOpenChange,
}: {
  request: Instruction
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const acceptInstruction = useAcceptInstruction()

  function handleConfirm() {
    acceptInstruction.mutate(request.id, {
      onSuccess: () => {
        toast.add({ title: "Tâche acceptée", type: "success" })
        onOpenChange(false)
      },
      onError: (error) =>
        toast.add({
          title: "Échec de l'acceptation",
          description: getApiErrorMessage(error, "Veuillez réessayer."),
          type: "error",
        }),
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[440px] gap-0 rounded-2xl p-4"
      >
        <DialogGradientHeader
          title={request.title}
          subtitle="Attribution de tâche"
          variant="success"
        />
        <p className="py-3 text-sm text-[#2f2f2f]">
          Êtes-vous sûr de vouloir <span className="font-bold">accepter</span>{" "}
          cette tâche ?
        </p>
        <DialogFooter>
          <Button
            className="bg-[#16a34a] text-sm font-medium tracking-normal text-white normal-case hover:bg-[#16a34a]/90"
            disabled={acceptInstruction.isPending}
            onClick={handleConfirm}
          >
            Oui, accepter
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
