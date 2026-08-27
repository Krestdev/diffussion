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
import { TaskViewDialog } from "@/components/taches/task-view-dialog"
import type { Instruction } from "@/hooks/instruction/type"

// Instruction has no backend-supported "un-terminate"/restore transition and
// no hard-delete endpoint — only "Voir" is a real action here.
export function ArchivedTaskRowActions({ task }: { task: Instruction }) {
  const [viewOpen, setViewOpen] = useState(false)

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
          <DropdownMenuItem onClick={() => setViewOpen(true)}>
            Voir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <TaskViewDialog task={task} open={viewOpen} onOpenChange={setViewOpen} />
    </>
  )
}
