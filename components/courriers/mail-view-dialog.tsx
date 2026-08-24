import {
  Calendar,
  FileText,
  Folder,
  Hash,
  Tag,
  User,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import { PriorityBadge } from "@/components/shared/priority-badge"
import type { Mail } from "@/components/courriers/types"

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

export function MailViewDialog({
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
        className="max-w-[760px] gap-0 rounded-2xl p-4"
      >
        <DialogGradientHeader title={mail.subject} subtitle="Courrier" />
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 py-4">
          <InfoRow
            icon={Hash}
            label="Référence"
            value={
              <span className="rounded bg-[#f2cfde] px-1.5 py-0.5 text-[#2f2f2f]">
                {mail.code}
              </span>
            }
          />
          <InfoRow
            icon={User}
            label="Correspondant"
            value={mail.correspondent}
          />
          <InfoRow icon={FileText} label="Objet" value={mail.subject} span />
          <InfoRow icon={Folder} label="Dossier" value={mail.folder} />
          <InfoRow icon={Tag} label="Nature" value={mail.nature} />
          <InfoRow icon={Tag} label="Type" value={mail.type} />
          <InfoRow
            icon={Calendar}
            label="Enregistré le"
            value={mail.registeredAt}
          />
          <InfoRow
            icon={Calendar}
            label="Priorité"
            value={<PriorityBadge priority={mail.priority} />}
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
