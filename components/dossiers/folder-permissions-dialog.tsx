import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import type { Folder } from "@/components/dossiers/types"

export function FolderPermissionsDialog({
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
          subtitle="Consultez les autorisations sur le dossier"
          variant="secondary"
        />
        <div className="py-3">
          <div className="grid grid-cols-[1fr_80px_80px] border-b border-[#dfdfdf] py-1 text-sm font-semibold text-[#2f2f2f]">
            <p>Utilisateur</p>
            <p className="text-center">Voir</p>
            <p className="text-center">Modifier</p>
          </div>
          {folder.permissions.map((permission) => (
            <div
              key={permission.user}
              className="grid grid-cols-[1fr_80px_80px] items-center py-2 text-sm font-medium text-[#2f2f2f]"
            >
              <p>{permission.user}</p>
              <div className="flex justify-center">
                <Checkbox checked={permission.canView} disabled />
              </div>
              <div className="flex justify-center">
                <Checkbox checked={permission.canEdit} disabled />
              </div>
            </div>
          ))}
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
