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
import { TaskRejectDialog } from "@/components/taches/task-reject-dialog"
import { TaskViewDialog } from "@/components/taches/task-view-dialog"
import type { Instruction } from "@/hooks/instruction/type"

type OpenDialog = "view" | "complete" | "reject" | null

const COMPLETABLE_STATUSES = ["EN_COURS", "A_CORRIGER"]
// Mirrors the backend's requireStatus gate in InstructionsService.refuse().
const REJECTABLE_STATUSES = ["EN_COURS"]

export function TaskRowActions({ task }: { task: Instruction }) {
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
          {COMPLETABLE_STATUSES.includes(task.status) && (
            <DropdownMenuItem onClick={() => setOpenDialog("complete")}>
              Compléter
            </DropdownMenuItem>
          )}
          {REJECTABLE_STATUSES.includes(task.status) && (
            <DropdownMenuItem
              variant="destructive"
              onClick={() => setOpenDialog("reject")}
            >
              Rejeter
            </DropdownMenuItem>
          )}
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
      <TaskRejectDialog
        task={task}
        open={openDialog === "reject"}
        onOpenChange={(open) => setOpenDialog(open ? "reject" : null)}
      />
    </>
  )
}
