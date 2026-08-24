import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { tasks } from "@/components/taches/data"
import { PriorityBadge } from "@/components/taches/priority-badge"
import { StatusBadge } from "@/components/taches/status-badge"
import { TaskRowActions } from "@/components/taches/task-row-actions"
import type { TaskPriority } from "@/components/taches/types"
import { cn } from "@/lib/utils"

/** Highlights a row background for priorities that need attention, matched to the Figma spec. */
const rowHighlight: Record<TaskPriority, string> = {
  urgent: "bg-[#fef2f2] hover:bg-[#fef2f2]",
  moyen: "bg-[#fffbeb] hover:bg-[#fffbeb]",
  normal: "",
}

export function TasksTable() {
  return (
    <Table className="border border-[#dfdfdf]">
      <TableHeader>
        <TableRow className="bg-[#f4f4f5] hover:bg-[#f4f4f5]">
          <TableHead className="border border-[#dfdfdf] normal-case">
            Référence
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Titre
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Dossier
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Priorité
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Reçu le
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Statut
          </TableHead>
          <TableHead className="border border-[#dfdfdf] text-right normal-case">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id} className={cn(rowHighlight[task.priority])}>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {task.code}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {task.title}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {task.folder}
            </TableCell>
            <TableCell className="border border-[#dfdfdf]">
              <PriorityBadge priority={task.priority} />
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {task.receivedAt}
            </TableCell>
            <TableCell className="border border-[#dfdfdf]">
              <StatusBadge status={task.status} />
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-right">
              <TaskRowActions task={task} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
