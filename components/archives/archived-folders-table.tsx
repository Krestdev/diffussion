import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { archivedFolders } from "@/components/archives/data"
import { ArchivedFolderRowActions } from "@/components/archives/archived-folder-row-actions"

export function ArchivedFoldersTable() {
  return (
    <Table className="border border-[#dfdfdf]">
      <TableHeader>
        <TableRow className="bg-[#f4f4f5] hover:bg-[#f4f4f5]">
          <TableHead className="border border-[#dfdfdf] normal-case">
            Référence
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Intitulé
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Courriers
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Site
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Type
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
        {archivedFolders.map((folder) => (
          <TableRow key={folder.id}>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {folder.code}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {folder.title}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {folder.mailsCount}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {folder.site}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {folder.type}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {folder.archivedAt}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-right">
              <ArchivedFolderRowActions folder={folder} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
