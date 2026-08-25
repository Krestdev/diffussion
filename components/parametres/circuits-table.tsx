import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { validationCircuits } from "@/components/parametres/data"
import { CircuitRowActions } from "@/components/parametres/circuit-row-actions"

export function CircuitsTable() {
  return (
    <Table className="border border-[#dfdfdf]">
      <TableHeader>
        <TableRow className="bg-[#f4f4f5] hover:bg-[#f4f4f5]">
          <TableHead className="border border-[#dfdfdf] normal-case">
            Référence
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Étapes
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Nature
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Site
          </TableHead>
          <TableHead className="border border-[#dfdfdf] text-right normal-case">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {validationCircuits.map((circuit) => (
          <TableRow key={circuit.id}>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {circuit.reference}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {circuit.steps.length > 0 ? circuit.steps.join(" → ") : "Aucune"}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {circuit.nature}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {circuit.site}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-right">
              <CircuitRowActions circuit={circuit} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
