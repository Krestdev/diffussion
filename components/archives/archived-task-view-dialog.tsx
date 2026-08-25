import { Archive, Calendar, Hash, TextQuote, type LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import { PriorityBadge } from "@/components/taches/priority-badge"
import type { ArchivedTask } from "@/components/archives/types"

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

export function ArchivedTaskViewDialog({
  task,
  open,
  onOpenChange,
}: {
  task: ArchivedTask
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[440px] gap-0 rounded-2xl p-4"
      >
        <DialogGradientHeader title={task.title} subtitle="Tâche" />
        <div className="flex flex-col gap-4 py-4">
          <InfoRow
            icon={Hash}
            label="Référence"
            value={
              <span className="rounded bg-[#f2cfde] px-1.5 py-0.5 text-[#2f2f2f]">
                {task.code}
              </span>
            }
          />
          <InfoRow icon={Archive} label="Dossier" value={task.folder} />
          <InfoRow
            icon={TextQuote}
            label="Priorité"
            value={<PriorityBadge priority={task.priority} />}
          />
          <InfoRow
            icon={Calendar}
            label="Archivé le"
            value={task.archivedAt}
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
