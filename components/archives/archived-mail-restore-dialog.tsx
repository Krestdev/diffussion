"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import { toast } from "@/components/ui/toast"
import { getApiErrorMessage } from "@/lib/apiError"
import { useUnarchiveCourrier } from "@/hooks/courrier/useCourrier"
import type { Courrier } from "@/hooks/courrier/type"

export function ArchivedMailRestoreDialog({
  mail,
  open,
  onOpenChange,
}: {
  mail: Courrier
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const unarchiveCourrier = useUnarchiveCourrier()

  function handleConfirm() {
    unarchiveCourrier.mutate(mail.id, {
      onSuccess: () => {
        toast.add({ title: "Courrier restauré", type: "success" })
        onOpenChange(false)
      },
      onError: (error) =>
        toast.add({
          title: "Échec de la restauration",
          description: getApiErrorMessage(error, "Veuillez réessayer."),
          type: "error",
        }),
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[460px] gap-0 rounded-2xl p-4"
      >
        <DialogGradientHeader
          title={mail.subject}
          subtitle="Restauration de courrier"
          variant="success"
        />
        <p className="py-3 text-sm text-[#2f2f2f]">
          Êtes-vous sûr de vouloir <span className="font-bold">restaurer</span>{" "}
          ce courrier ? Il repassera au statut clôturé.
        </p>
        <DialogFooter>
          <Button
            className="bg-[#16a34a] text-sm font-medium tracking-normal text-white normal-case hover:bg-[#16a34a]/90"
            disabled={unarchiveCourrier.isPending}
            onClick={handleConfirm}
          >
            Oui, restaurer
          </Button>
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
