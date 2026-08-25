import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { roles } from "@/components/roles/data"
import { RoleRowActions } from "@/components/roles/role-row-actions"

export function RolesTable() {
  return (
    <Table className="border border-[#dfdfdf]">
      <TableHeader>
        <TableRow className="bg-[#f4f4f5] hover:bg-[#f4f4f5]">
          <TableHead className="border border-[#dfdfdf] normal-case">
            Référence
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Nom
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Permissions
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Utilisateurs
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
        {roles.map((role) => (
          <TableRow key={role.id}>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {role.code}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {role.name}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {role.permissions.length}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {role.usersCount}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {role.createdAt}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-right">
              <RoleRowActions role={role} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
