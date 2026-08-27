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
import type { Dossier } from "@/hooks/dossier/type"

type OpenDialog = "close" | "reopen" | "archive" | null

// "Voir" now opens the full detail page (contents, access rights, circuit)
// instead of a dialog — see app/(dashboard)/dossiers/[id]/page.tsx. That
// page also covers what the old "Permissions"/"Voir les documents" dialogs
// used to show, so those menu entries are gone.
export function FolderRowActions({ folder }: { folder: Dossier }) {
  const [openDialog, setOpenDialog] = useState<OpenDialog>(null)

  const isTerminal = folder.status === "ARCHIVED"
  const isClosed = folder.status === "CLOSED"

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
          <DropdownMenuItem render={<Link href={`/dossiers/${folder.id}`} />}>
            Voir
          </DropdownMenuItem>
          {!isTerminal && (
            <DropdownMenuItem
              render={<Link href={`/dossiers/${folder.id}/modifier`} />}
            >
              Modifier
            </DropdownMenuItem>
          )}
          {!isClosed && !isTerminal && (
            <DropdownMenuItem onClick={() => setOpenDialog("close")}>
              Clôturer
            </DropdownMenuItem>
          )}
          {isClosed && (
            <DropdownMenuItem onClick={() => setOpenDialog("reopen")}>
              Réouvrir
            </DropdownMenuItem>
          )}
          {isClosed && (
            <DropdownMenuItem
              variant="destructive"
              onClick={() => setOpenDialog("archive")}
            >
              Archiver
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {(openDialog === "close" || openDialog === "reopen" || openDialog === "archive") && (
        <FolderArchiveDialog
          folder={folder}
          action={openDialog}
          open
          onOpenChange={(open) => setOpenDialog(open ? openDialog : null)}
        />
      )}
    </>
  )
}
