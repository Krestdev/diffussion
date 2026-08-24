import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import type { OutgoingMail } from "@/components/courriers-sortants/types"

export function OutgoingMailCancelDialog({
  mail,
  open,
  onOpenChange,
}: {
  mail: OutgoingMail
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[460px] gap-0 rounded-2xl p-4"
      >
        <DialogGradientHeader
          title="Annuler le courrier"
          subtitle={mail.subject}
          variant="destructive"
        />
        <p className="py-3 text-sm text-[#2f2f2f]">
          Êtes-vous sûr de vouloir <span className="font-bold">annuler</span> ce
          courrier ? Cette action est irréversible.
        </p>
        <DialogFooter>
          <Button
            className="bg-destructive text-sm font-medium tracking-normal text-white normal-case hover:bg-destructive/90"
            onClick={() => onOpenChange(false)}
          >
            Oui, annuler
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
