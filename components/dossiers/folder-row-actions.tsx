"use client"

import Link from "next/link"
import { useState } from "react"
import { Ellipsis } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FolderArchiveDialog } from "@/components/dossiers/folder-archive-dialog"
import { FolderDocumentsDialog } from "@/components/dossiers/folder-documents-dialog"
import { FolderPermissionsDialog } from "@/components/dossiers/folder-permissions-dialog"
import { FolderViewDialog } from "@/components/dossiers/folder-view-dialog"
import type { Folder } from "@/components/dossiers/types"

type OpenDialog = "view" | "permissions" | "documents" | "archive" | null

export function FolderRowActions({ folder }: { folder: Folder }) {
  const [openDialog, setOpenDialog] = useState<OpenDialog>(null)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="outline" size="icon-sm" className="rounded" />
          }
        >
          <Ellipsis className="size-4" />
          <span className="sr-only">Actions</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setOpenDialog("view")}>
            Voir
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDialog("permissions")}>
            Permissions
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDialog("documents")}>
            Voir les documents
          </DropdownMenuItem>
          <DropdownMenuItem
            render={<Link href={`/dossiers/${folder.id}/modifier`} />}
          >
            Modifier
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setOpenDialog("archive")}
          >
            Archiver
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <FolderViewDialog
        folder={folder}
        open={openDialog === "view"}
        onOpenChange={(open) => setOpenDialog(open ? "view" : null)}
      />
      <FolderPermissionsDialog
        folder={folder}
        open={openDialog === "permissions"}
        onOpenChange={(open) => setOpenDialog(open ? "permissions" : null)}
      />
      <FolderDocumentsDialog
        folder={folder}
        open={openDialog === "documents"}
        onOpenChange={(open) => setOpenDialog(open ? "documents" : null)}
      />
      <FolderArchiveDialog
        folder={folder}
        open={openDialog === "archive"}
        onOpenChange={(open) => setOpenDialog(open ? "archive" : null)}
      />
    </>
  )
}
