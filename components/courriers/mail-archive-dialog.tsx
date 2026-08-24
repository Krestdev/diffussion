import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import type { Mail } from "@/components/courriers/types"

export function MailArchiveDialog({
  mail,
  open,
  onOpenChange,
}: {
  mail: Mail
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
          title="Archiver le courrier"
          subtitle={mail.folder}
          variant="secondary"
        />
        <p className="py-3 text-sm text-[#2f2f2f]">
          Êtes-vous sûr de vouloir <span className="font-bold">archiver</span>{" "}
          ce courrier ? Cette action est irréversible.
        </p>
        <DialogFooter>
          <Button
            className="bg-[#16a34a] text-sm font-medium tracking-normal text-white normal-case hover:bg-[#16a34a]/90"
            onClick={() => onOpenChange(false)}
          >
            Oui, archiver
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
