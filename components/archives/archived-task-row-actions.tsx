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
import { ArchivedTaskDeleteDialog } from "@/components/archives/archived-task-delete-dialog"
import { ArchivedTaskRestoreDialog } from "@/components/archives/archived-task-restore-dialog"
import { ArchivedTaskViewDialog } from "@/components/archives/archived-task-view-dialog"
import type { ArchivedTask } from "@/components/archives/types"

type OpenDialog = "view" | "restore" | "delete" | null

export function ArchivedTaskRowActions({ task }: { task: ArchivedTask }) {
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

      <ArchivedTaskViewDialog
        task={task}
        open={openDialog === "view"}
        onOpenChange={(open) => setOpenDialog(open ? "view" : null)}
      />
      <ArchivedTaskRestoreDialog
        task={task}
        open={openDialog === "restore"}
        onOpenChange={(open) => setOpenDialog(open ? "restore" : null)}
      />
      <ArchivedTaskDeleteDialog
        task={task}
        open={openDialog === "delete"}
        onOpenChange={(open) => setOpenDialog(open ? "delete" : null)}
      />
    </>
  )
}
