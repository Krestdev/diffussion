import {
  Archive,
  Calendar,
  CalendarDays,
  ChevronsUp,
  CircleQuestionMark,
  Hash,
  TextQuote,
  UserStar,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import { LivrableStatusBadge } from "@/components/shared/livrable-status-badge"
import { PriorityBadge } from "@/components/shared/priority-badge"
import { StatusBadge } from "@/components/taches/status-badge"
import { taskStatusBucket } from "@/components/taches/types"
import { toBadgePriority } from "@/lib/priority"
import type { Instruction } from "@/hooks/instruction/type"

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
    <div className={span ? "col-span-2 flex gap-2" : "flex gap-2"}>
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#e4e4e7]">
        <Icon className="size-6 text-[#52525b]" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-[#52525b]">{label}</p>
        <div className="text-sm font-medium text-[#2f2f2f]">{value}</div>
      </div>
    </div>
  )
}

export function TaskViewDialog({
  task,
  open,
  onOpenChange,
}: {
  task: Instruction
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const supervisor = task.assignees.find((a) => a.role === "SUPERVISEUR")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[760px] gap-0 rounded-2xl p-4"
      >
        <DialogGradientHeader title={task.title} subtitle="Tâche" />
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 py-4">
          <InfoRow
            icon={Hash}
            label="Référence"
            value={
              <span className="rounded bg-[#f2cfde] px-1.5 py-0.5 text-[#9e1351]">
                {task.number}
              </span>
            }
          />
          <InfoRow icon={Archive} label="Dossier" value={task.dossier.title} />
          <InfoRow
            icon={TextQuote}
            label="Description"
            value={task.description ?? "—"}
            span
          />
          <InfoRow
            icon={CircleQuestionMark}
            label="Statut"
            value={<StatusBadge status={taskStatusBucket(task.status)} showIcon />}
          />
          <InfoRow
            icon={ChevronsUp}
            label="Priorité"
            value={<PriorityBadge priority={toBadgePriority(task.priority)} />}
          />
          <InfoRow
            icon={UserStar}
            label="Superviseur"
            value={supervisor?.user.name ?? "—"}
          />
          <InfoRow
            icon={CalendarDays}
            label="Délai"
            value={
              task.dueDate
                ? new Date(task.dueDate).toLocaleDateString("fr-FR")
                : "—"
            }
          />
          <InfoRow
            icon={Calendar}
            label="Créé le"
            value={new Date(task.createdAt).toLocaleDateString("fr-FR")}
          />
          <InfoRow
            icon={Calendar}
            label="Modifié le"
            value={new Date(task.updatedAt).toLocaleDateString("fr-FR")}
          />
          {task.livrables.map((livrable, index) => (
            <InfoRow
              key={livrable.id}
              icon={Archive}
              label={`Livrable ${index + 1}`}
              value={
                <div className="flex flex-col items-start gap-1">
                  <span>{livrable.title}</span>
                  <LivrableStatusBadge status={livrable.status} />
                </div>
              }
            />
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
