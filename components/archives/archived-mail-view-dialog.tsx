import {
  Archive,
  Calendar,
  Hash,
  TextQuote,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import { PriorityBadge } from "@/components/shared/priority-badge"
import { ArchivedMailTypeBadge } from "@/components/archives/archived-mail-type-badge"
import type { ArchivedMail } from "@/components/archives/types"

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="flex gap-3">
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

export function ArchivedMailViewDialog({
  mail,
  open,
  onOpenChange,
}: {
  mail: ArchivedMail
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[440px] gap-0 rounded-2xl p-4"
      >
        <DialogGradientHeader title={mail.subject} subtitle="Courrier" />
        <div className="flex flex-col gap-4 py-4">
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
            icon={TextQuote}
            label="Type"
            value={<ArchivedMailTypeBadge type={mail.type} />}
          />
          <InfoRow icon={Archive} label="Dossier" value={mail.folder} />
          <InfoRow
            icon={Calendar}
            label="Priorité"
            value={<PriorityBadge priority={mail.priority} />}
          />
          <InfoRow
            icon={Calendar}
            label="Enregistré le"
            value={mail.registeredAt}
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
