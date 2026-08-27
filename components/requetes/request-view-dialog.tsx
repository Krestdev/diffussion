import {
  Archive,
  Calendar,
  CalendarDays,
  ChevronsUp,
  CircleQuestionMark,
  File,
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
import { StatusBadge } from "@/components/requetes/status-badge"
import { requestStatusBucket } from "@/components/requetes/types"
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

export function RequestViewDialog({
  request,
  open,
  onOpenChange,
}: {
  request: Instruction
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const supervisor = request.assignees.find((a) => a.role === "SUPERVISEUR")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[760px] gap-0 rounded-2xl p-4"
      >
        <DialogGradientHeader title={request.title} subtitle="Tâche" />
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 py-4">
          <InfoRow
            icon={Hash}
            label="Référence"
            value={
              <span className="rounded bg-[#f2cfde] px-1.5 py-0.5 text-[#9e1351]">
                {request.number}
              </span>
            }
          />
          <InfoRow icon={Archive} label="Dossier" value={request.dossier.title} />
          <InfoRow
            icon={TextQuote}
            label="Description"
            value={request.description ?? "—"}
            span
          />
          <InfoRow
            icon={CircleQuestionMark}
            label="Statut"
            value={<StatusBadge status={requestStatusBucket(request.status)} showIcon />}
          />
          <InfoRow
            icon={ChevronsUp}
            label="Priorité"
            value={<PriorityBadge priority={toBadgePriority(request.priority)} />}
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
              request.dueDate
                ? new Date(request.dueDate).toLocaleDateString("fr-FR")
                : "—"
            }
          />
          <InfoRow
            icon={Calendar}
            label="Créé le"
            value={new Date(request.createdAt).toLocaleDateString("fr-FR")}
          />
          <InfoRow
            icon={Calendar}
            label="Modifié le"
            value={new Date(request.updatedAt).toLocaleDateString("fr-FR")}
          />
          {request.livrables.map((livrable, index) => (
            <InfoRow
              key={livrable.id}
              icon={File}
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
