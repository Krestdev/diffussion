"use client"

import { useState } from "react"
import { Ellipsis } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArchivedFolderDeleteDialog } from "@/components/archives/archived-folder-delete-dialog"
import { ArchivedFolderRestoreDialog } from "@/components/archives/archived-folder-restore-dialog"
import { ArchivedFolderViewDialog } from "@/components/archives/archived-folder-view-dialog"
import type { ArchivedFolder } from "@/components/archives/types"

type OpenDialog = "view" | "restore" | "delete" | null

export function ArchivedFolderRowActions({
  folder,
}: {
  folder: ArchivedFolder
}) {
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
          <DropdownMenuItem onClick={() => setOpenDialog("restore")}>
            Restaurer
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setOpenDialog("delete")}
          >
            Supprimer définitivement
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ArchivedFolderViewDialog
        folder={folder}
        open={openDialog === "view"}
        onOpenChange={(open) => setOpenDialog(open ? "view" : null)}
      />
      <ArchivedFolderRestoreDialog
        folder={folder}
        open={openDialog === "restore"}
        onOpenChange={(open) => setOpenDialog(open ? "restore" : null)}
      />
      <ArchivedFolderDeleteDialog
        folder={folder}
        open={openDialog === "delete"}
        onOpenChange={(open) => setOpenDialog(open ? "delete" : null)}
      />
    </>
  )
}
