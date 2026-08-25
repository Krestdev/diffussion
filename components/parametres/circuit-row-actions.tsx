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
import { CircuitViewDialog } from "@/components/parametres/circuit-view-dialog"
import { CircuitEditDialog } from "@/components/parametres/circuit-edit-dialog"
import type { ValidationCircuit } from "@/components/parametres/types"

type OpenDialog = "view" | "edit" | null

export function CircuitRowActions({ circuit }: { circuit: ValidationCircuit }) {
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
          <DropdownMenuItem onClick={() => setOpenDialog("edit")}>
            Modifier
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CircuitViewDialog
        circuit={circuit}
        open={openDialog === "view"}
        onOpenChange={(open) => setOpenDialog(open ? "view" : null)}
      />
      <CircuitEditDialog
        circuit={circuit}
        open={openDialog === "edit"}
        onOpenChange={(open) => setOpenDialog(open ? "edit" : null)}
      />
    </>
  )
}
