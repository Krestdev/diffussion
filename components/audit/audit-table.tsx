import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { auditLogs } from "@/components/audit/data"
import { AuditRowActions } from "@/components/audit/audit-row-actions"

export function AuditTable() {
  return (
    <Table className="border border-[#dfdfdf]">
      <TableHeader>
        <TableRow className="bg-[#f4f4f5] hover:bg-[#f4f4f5]">
          <TableHead className="border border-[#dfdfdf] normal-case">
            Référence
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Action
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Utilisateur
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Type d’objet
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Référence de l’objet
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Date
          </TableHead>
          <TableHead className="border border-[#dfdfdf] text-right normal-case">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {auditLogs.map((log) => (
          <TableRow key={log.id}>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {log.reference}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {log.action}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {log.user}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {log.entityType}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {log.objectReference}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {log.date}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-right">
              <AuditRowActions log={log} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
