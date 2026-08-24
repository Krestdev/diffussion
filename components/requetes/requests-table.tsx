import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { requests } from "@/components/requetes/data"
import { PriorityBadge } from "@/components/requetes/priority-badge"
import { RequestRowActions } from "@/components/requetes/request-row-actions"

export function RequestsTable() {
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
          <TableHead className="border border-[#dfdfdf] text-right normal-case">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request) => (
          <TableRow key={request.id}>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {request.code}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {request.title}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {request.folder}
            </TableCell>
            <TableCell className="border border-[#dfdfdf]">
              <PriorityBadge priority={request.priority} />
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {request.receivedAt}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-right">
              <RequestRowActions request={request} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
