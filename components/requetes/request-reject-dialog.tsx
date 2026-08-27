"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import { toast } from "@/components/ui/toast"
import { getApiErrorMessage } from "@/lib/apiError"
import { useRefuseInstruction } from "@/hooks/instruction/useInstruction"
import type { Instruction } from "@/hooks/instruction/type"

export function RequestRejectDialog({
  request,
  open,
  onOpenChange,
}: {
  request: Instruction
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [reason, setReason] = useState("")
  const refuseInstruction = useRefuseInstruction()

  function handleOpenChange(next: boolean) {
    if (!next) setReason("")
    onOpenChange(next)
  }

  function handleReject() {
    refuseInstruction.mutate(
      { id: request.id, motif: reason },
      {
        onSuccess: () => {
          toast.add({ title: "Tâche rejetée", type: "success" })
          handleOpenChange(false)
        },
        onError: (error) =>
          toast.add({
            title: "Échec du rejet",
            description: getApiErrorMessage(error, "Veuillez réessayer."),
            type: "error",
          }),
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[440px] gap-0 rounded-2xl p-4"
      >
        <DialogGradientHeader
          title={request.title}
          subtitle="Rejet de tâche"
          variant="destructive"
        />
        <div className="flex flex-col gap-1.5 py-3">
          <Label
            htmlFor="reject-reason"
            className="text-sm font-medium tracking-normal text-[#18181b] normal-case"
          >
            Motif <span className="text-[#dc2626]">*</span>
          </Label>
          <Textarea
            id="reject-reason"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            placeholder="ex. Mon planning est déjà surchargé"
            className="min-h-[60px] rounded border border-[#e4e4e7] border-b-[#e4e4e7] px-3 py-2 text-sm focus-visible:border-[#e4e4e7]"
          />
        </div>
        <DialogFooter>
          <Button
            disabled={reason.trim().length < 3 || refuseInstruction.isPending}
            className="bg-[#ef4444] text-sm font-medium tracking-normal text-white normal-case hover:bg-[#ef4444]/90"
            onClick={handleReject}
          >
            Rejeter
          </Button>
          <Button
            variant="outline"
            className="text-sm font-medium tracking-normal normal-case"
            onClick={() => handleOpenChange(false)}
          >
            Annuler
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
