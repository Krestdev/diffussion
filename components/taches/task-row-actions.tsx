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
import { TaskCompleteDialog } from "@/components/taches/task-complete-dialog"
import { TaskViewDialog } from "@/components/taches/task-view-dialog"
import type { Task } from "@/components/taches/types"

type OpenDialog = "view" | "complete" | null

export function TaskRowActions({ task }: { task: Task }) {
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
          <DropdownMenuItem onClick={() => setOpenDialog("complete")}>
            Compléter
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <TaskViewDialog
        task={task}
        open={openDialog === "view"}
        onOpenChange={(open) => setOpenDialog(open ? "view" : null)}
      />
      <TaskCompleteDialog
        task={task}
        open={openDialog === "complete"}
        onOpenChange={(open) => setOpenDialog(open ? "complete" : null)}
      />
    </>
  )
}
