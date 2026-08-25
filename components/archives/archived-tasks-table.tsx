import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PriorityBadge } from "@/components/taches/priority-badge"
import { archivedTasks } from "@/components/archives/data"
import { ArchivedTaskRowActions } from "@/components/archives/archived-task-row-actions"

export function ArchivedTasksTable() {
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
            Archivé le
          </TableHead>
          <TableHead className="border border-[#dfdfdf] text-right normal-case">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {archivedTasks.map((task) => (
          <TableRow key={task.id}>
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
              {task.archivedAt}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-right">
              <ArchivedTaskRowActions task={task} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
