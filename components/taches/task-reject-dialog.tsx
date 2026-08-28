"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import { UserCombobox } from "@/components/shared/user-combobox"
import { toast } from "@/components/ui/toast"
import { getApiErrorMessage } from "@/lib/apiError"
import { useAdminUsers } from "@/hooks/adminUser/useAdminUser"
import { useRefuseInstruction } from "@/hooks/instruction/useInstruction"
import type { Instruction } from "@/hooks/instruction/type"

// Rejecting a task reassigns it in the same step (RG-INS-003/004) — there's
// no separate "unassigned, waiting to be picked up" queue, so the new
// executant is chosen right here rather than in a follow-up screen.
export function TaskRejectDialog({
  task,
  open,
  onOpenChange,
}: {
  task: Instruction
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { data: users } = useAdminUsers()
  const currentExecutantIds = new Set(
    task.assignees.filter((a) => a.role === "EXECUTANT").map((a) => a.userId)
  )
  const candidates = users?.filter((user) => !currentExecutantIds.has(user.id)) ?? []

  const [reason, setReason] = useState("")
  const [assigneeName, setAssigneeName] = useState("")
  const refuseInstruction = useRefuseInstruction()

  function handleOpenChange(next: boolean) {
    if (!next) {
      setReason("")
      setAssigneeName("")
    }
    onOpenChange(next)
  }

  function handleReject() {
    const newAssigneeId = candidates.find((u) => u.name === assigneeName)?.id
    if (!newAssigneeId) return
    refuseInstruction.mutate(
      { id: task.id, motif: reason, newAssigneeId },
      {
        onSuccess: () => {
          toast.add({ title: "Tâche rejetée et réassignée", type: "success" })
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
          title={task.title}
          subtitle="Rejet et réassignation de la tâche"
          variant="destructive"
        />
        <div className="flex flex-col gap-3 py-3">
          <div className="flex flex-col gap-1.5">
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
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium tracking-normal text-[#18181b] normal-case">
              Réassigner à <span className="text-[#dc2626]">*</span>
            </Label>
            <UserCombobox
              users={candidates.map((user) => user.name)}
              value={assigneeName}
              onChange={setAssigneeName}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={
              reason.trim().length < 3 ||
              !assigneeName ||
              refuseInstruction.isPending
            }
            className="bg-[#ef4444] text-sm font-medium tracking-normal text-white normal-case hover:bg-[#ef4444]/90"
            onClick={handleReject}
          >
            Rejeter et réassigner
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
