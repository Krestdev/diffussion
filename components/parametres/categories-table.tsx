import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { documentCategories } from "@/components/parametres/data"
import { CategoryRowActions } from "@/components/parametres/category-row-actions"

export function CategoriesTable() {
  return (
    <Table className="border border-[#dfdfdf]">
      <TableHeader>
        <TableRow className="bg-[#f4f4f5] hover:bg-[#f4f4f5]">
          <TableHead className="border border-[#dfdfdf] normal-case">
            Référence
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Libellé
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Description
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Créé le
          </TableHead>
          <TableHead className="border border-[#dfdfdf] text-right normal-case">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {documentCategories.map((category) => (
          <TableRow key={category.id}>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {category.reference}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {category.label}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {category.description}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {category.createdAt}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-right">
              <CategoryRowActions category={category} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
