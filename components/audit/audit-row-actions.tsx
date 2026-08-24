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
import { AuditViewDialog } from "@/components/audit/audit-view-dialog"
import type { AuditLog } from "@/components/audit/types"

type OpenDialog = "view" | null

export function AuditRowActions({ log }: { log: AuditLog }) {
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
        </DropdownMenuContent>
      </DropdownMenu>

      <AuditViewDialog
        log={log}
        open={openDialog === "view"}
        onOpenChange={(open) => setOpenDialog(open ? "view" : null)}
      />
    </>
  )
}
