import {
  Briefcase,
  Calendar,
  FileText,
  Hash,
  Map,
  SquareUserRound,
  TextQuote,
  UserRound,
  Star,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import type { ArchivedFolder } from "@/components/archives/types"

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
      <div className="flex-1">
        <p className="text-sm text-[#52525b]">{label}</p>
        <div className="text-sm font-medium text-[#18181b]">{value}</div>
      </div>
    </div>
  )
}

export function ArchivedFolderViewDialog({
  folder,
  open,
  onOpenChange,
}: {
  folder: ArchivedFolder
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
          <InfoRow
            icon={UserRound}
            label="Archivé par"
            value={folder.archivedBy}
          />
          <InfoRow
            icon={Calendar}
            label="Archivé le"
            value={folder.archivedAt}
          />
          {folder.files.length > 0 && (
            <InfoRow
              icon={FileText}
              label="Documents joints"
              span
              value={
                <div className="flex flex-col gap-2 pt-1">
                  {folder.files.map((file) => (
                    <div key={file.name} className="flex items-center gap-2">
                      <FileText className="size-4 shrink-0 text-[#dc2626]" />
                      <div>
                        <p className="text-sm font-medium text-[#18181b]">
                          {file.name}
                        </p>
                        <p className="text-xs font-normal text-[#71717a]">
                          Fichier PDF
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              }
            />
          )}
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
