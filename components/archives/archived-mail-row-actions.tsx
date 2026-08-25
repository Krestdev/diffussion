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
import { ArchivedMailDeleteDialog } from "@/components/archives/archived-mail-delete-dialog"
import { ArchivedMailRestoreDialog } from "@/components/archives/archived-mail-restore-dialog"
import { ArchivedMailViewDialog } from "@/components/archives/archived-mail-view-dialog"
import type { ArchivedMail } from "@/components/archives/types"

type OpenDialog = "view" | "restore" | "delete" | null

export function ArchivedMailRowActions({ mail }: { mail: ArchivedMail }) {
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

      <ArchivedMailViewDialog
        mail={mail}
        open={openDialog === "view"}
        onOpenChange={(open) => setOpenDialog(open ? "view" : null)}
      />
      <ArchivedMailRestoreDialog
        mail={mail}
        open={openDialog === "restore"}
        onOpenChange={(open) => setOpenDialog(open ? "restore" : null)}
      />
      <ArchivedMailDeleteDialog
        mail={mail}
        open={openDialog === "delete"}
        onOpenChange={(open) => setOpenDialog(open ? "delete" : null)}
      />
    </>
  )
}
