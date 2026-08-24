import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PriorityBadge } from "@/components/shared/priority-badge"
import { OutgoingMailRowActions } from "@/components/courriers-sortants/outgoing-mail-row-actions"
import type { OutgoingMail } from "@/components/courriers-sortants/types"

export function OutgoingMailsTable({ mails }: { mails: OutgoingMail[] }) {
  return (
    <Table className="border border-[#dfdfdf]">
      <TableHeader>
        <TableRow className="bg-[#f4f4f5] hover:bg-[#f4f4f5]">
          <TableHead className="border border-[#dfdfdf] normal-case">
            Référence
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Objet
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Dossier
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Correspondant
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Priorité
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Enregistré le
          </TableHead>
          <TableHead className="border border-[#dfdfdf] text-right normal-case">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mails.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={7}
              className="border border-[#dfdfdf] py-8 text-center text-sm text-[#71717a]"
            >
              Aucun courrier dans cette catégorie
            </TableCell>
          </TableRow>
        )}
        {mails.map((mail) => (
          <TableRow key={mail.id}>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {mail.code}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {mail.subject}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {mail.folder}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {mail.correspondent}
            </TableCell>
            <TableCell className="border border-[#dfdfdf]">
              <PriorityBadge priority={mail.priority} />
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {mail.registeredAt}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-right">
              <OutgoingMailRowActions mail={mail} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
