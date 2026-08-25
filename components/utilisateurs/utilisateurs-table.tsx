import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { appUsers } from "@/components/utilisateurs/data"
import { UserRowActions } from "@/components/utilisateurs/user-row-actions"

export function UtilisateursTable() {
  return (
    <Table className="border border-[#dfdfdf]">
      <TableHeader>
        <TableRow className="bg-[#f4f4f5] hover:bg-[#f4f4f5]">
          <TableHead className="border border-[#dfdfdf] normal-case">
            Référence
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Nom & prénoms
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Adresse mail
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Fonction
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Site
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
        {appUsers.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {user.code}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {user.fullName}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {user.email}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {user.function}
            </TableCell>
            <TableCell className="border border-[#dfdfdf]">
              <div className="flex flex-wrap gap-1">
                {user.sites.map((site) => (
                  <span
                    key={site}
                    className="inline-flex h-[22px] items-center rounded-md border border-[#e4e4e7] bg-[#f4f4f5] px-2 py-0.5 text-sm font-medium text-[#52525b]"
                  >
                    {site}
                  </span>
                ))}
              </div>
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {user.createdAt}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-right">
              <UserRowActions user={user} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
