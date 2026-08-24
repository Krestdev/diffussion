import {
  Briefcase,
  Calendar,
  Hash,
  Map,
  SquareUserRound,
  TextQuote,
  User,
  Star,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import type { Folder } from "@/components/dossiers/types"

function InfoRow({
  icon: Icon,
  label,
  value,
  span,
}: {
  icon: LucideIcon
  label: string
  value: React.ReactNode
  span?: boolean
}) {
  return (
    <div className={span ? "col-span-2 flex gap-3" : "flex gap-3"}>
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f4f4f5]">
        <Icon className="size-6 text-[#52525b]" />
      </div>
      <div>
        <p className="text-sm text-[#52525b]">{label}</p>
        <div className="text-sm font-medium text-[#18181b]">{value}</div>
      </div>
    </div>
  )
}

export function FolderViewDialog({
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
        className="max-w-[760px] gap-0 rounded-2xl p-4"
      >
        <DialogGradientHeader title={folder.title} subtitle="Dossier" />
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 py-4">
          <InfoRow
            icon={Hash}
            label="Référence"
            value={
              <span className="rounded bg-[#f2cfde] px-1.5 py-0.5 text-[#2f2f2f]">
                {folder.referenceNumber}
              </span>
            }
          />
          <InfoRow
            icon={SquareUserRound}
            label="Responsable du Dossier"
            value={folder.responsible}
          />
          <InfoRow
            icon={TextQuote}
            label="Description"
            value={folder.description}
            span
          />
          <InfoRow icon={Star} label="Type" value={folder.type} />
          <InfoRow icon={Briefcase} label="Projet" value={folder.project} />
          <InfoRow icon={Map} label="Site" value={folder.site} />
          <InfoRow icon={User} label="Créé par" value={folder.createdBy} />
          <InfoRow icon={Calendar} label="Créé le" value={folder.createdAt} />
          <InfoRow
            icon={Calendar}
            label="Modifié le"
            value={folder.updatedAt}
          />
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
