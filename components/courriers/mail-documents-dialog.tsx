import { FileX, Paperclip } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import type { Mail } from "@/components/courriers/types"

export function MailDocumentsDialog({
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
        className="max-w-[440px] gap-0 rounded-2xl p-4"
      >
        <DialogGradientHeader
          title={mail.subject}
          subtitle="Documents associés au courrier"
          variant="secondary"
        />
        {mail.documents.length > 0 ? (
          <ul className="flex flex-col gap-2 py-3">
            {mail.documents.map((document) => (
              <li
                key={document.name}
                className="flex items-center gap-2 rounded-lg border border-[#f4f4f5] p-2"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded bg-[#f4f4f5]">
                  <Paperclip className="size-4 text-[#52525b]" />
                </span>
                <div className="flex-1">
                  <p className="text-sm text-[#2f2f2f]">{document.name}</p>
                  <p className="text-xs text-[#a1a1aa]">{document.category}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <FileX className="size-8 text-[#a1a1aa]" />
            <p className="text-sm text-[#71717a]">Aucun document disponible</p>
          </div>
        )}
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
