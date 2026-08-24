import { FileX } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import type { Folder } from "@/components/dossiers/types"

export function FolderDocumentsDialog({
  folder,
  open,
  onOpenChange,
}: {
  folder: Folder
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
          title={folder.title}
          subtitle="Documents associés au dossier"
          variant="secondary"
        />
        <div className="flex flex-col items-center gap-2 py-8 text-center">
          <FileX className="size-8 text-[#a1a1aa]" />
          <p className="text-sm text-[#71717a]">Aucun document disponible</p>
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
