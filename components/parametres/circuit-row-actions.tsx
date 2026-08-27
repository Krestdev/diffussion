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
import { CircuitFormDialog } from "@/components/parametres/circuit-form-dialog"
import { CircuitStepsDialog } from "@/components/parametres/circuit-steps-dialog"
import { CircuitDeleteDialog } from "@/components/parametres/circuit-delete-dialog"
import type { Circuit } from "@/hooks/circuit/type"

type OpenDialog = "edit" | "steps" | "delete" | null

export function CircuitRowActions({ circuit }: { circuit: Circuit }) {
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
          <DropdownMenuItem onClick={() => setOpenDialog("steps")}>
            Gérer les étapes
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDialog("edit")}>
            Modifier
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setOpenDialog("delete")}
          >
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CircuitStepsDialog
        circuit={circuit}
        open={openDialog === "steps"}
        onOpenChange={(open) => setOpenDialog(open ? "steps" : null)}
      />
      <CircuitFormDialog
        circuit={circuit}
        open={openDialog === "edit"}
        onOpenChange={(open) => setOpenDialog(open ? "edit" : null)}
      />
      <CircuitDeleteDialog
        circuit={circuit}
        open={openDialog === "delete"}
        onOpenChange={(open) => setOpenDialog(open ? "delete" : null)}
      />
    </>
  )
}
