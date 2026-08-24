import { Eye, Lock } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { folders } from "@/components/dossiers/data"
import { FolderIcon } from "@/components/dossiers/folder-icon"
import { FolderRowActions } from "@/components/dossiers/folder-row-actions"

export function FoldersTable() {
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
            Confidentialité
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
        {folders.map((folder) => (
          <TableRow key={folder.id}>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {folder.code}
            </TableCell>
            <TableCell className="border border-[#dfdfdf]">
              <span className="flex items-center gap-2 text-[#2f2f2f]">
                <FolderIcon />
                {folder.title}
              </span>
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {folder.lettersCount}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {folder.site}
            </TableCell>
            <TableCell className="border border-[#dfdfdf]">
              <span className="flex items-center gap-2 text-[#2f2f2f]">
                {folder.confidentiality === "public" ? (
                  <Eye className="size-5 text-[#52525b]" />
                ) : (
                  <Lock className="size-5 text-[#52525b]" />
                )}
                {folder.confidentiality === "public" ? "Public" : "Restreint"}
              </span>
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {folder.createdAt}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-right">
              <FolderRowActions folder={folder} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
