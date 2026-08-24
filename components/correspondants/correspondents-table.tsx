import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { correspondents } from "@/components/correspondants/data"
import { CorrespondentRowActions } from "@/components/correspondants/correspondent-row-actions"

export function CorrespondentsTable() {
  return (
    <Table className="border border-[#dfdfdf]">
      <TableHeader>
        <TableRow className="bg-[#f4f4f5] hover:bg-[#f4f4f5]">
          <TableHead className="border border-[#dfdfdf] normal-case">
            Référence
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Nom / Raison sociale
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Ville
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Type
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Dernière correspondance
          </TableHead>
          <TableHead className="border border-[#dfdfdf] text-right normal-case">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {correspondents.map((correspondent) => (
          <TableRow key={correspondent.id}>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {correspondent.code}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {correspondent.name}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {correspondent.city}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {correspondent.type}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {correspondent.lastCorrespondenceAt}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-right">
              <CorrespondentRowActions correspondent={correspondent} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
