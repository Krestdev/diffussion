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
import { OutgoingMailCancelDialog } from "@/components/courriers-sortants/outgoing-mail-cancel-dialog"
import { OutgoingMailViewDialog } from "@/components/courriers-sortants/outgoing-mail-view-dialog"
import type { OutgoingMail } from "@/components/courriers-sortants/types"

type OpenDialog = "view" | "cancel" | null

export function OutgoingMailRowActions({ mail }: { mail: OutgoingMail }) {
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
          <DropdownMenuItem
            render={<Link href={`/courriers/sortants/${mail.id}/modifier`} />}
          >
            Modifier
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setOpenDialog("cancel")}
          >
            Annuler
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <OutgoingMailViewDialog
        mail={mail}
        open={openDialog === "view"}
        onOpenChange={(open) => setOpenDialog(open ? "view" : null)}
      />
      <OutgoingMailCancelDialog
        mail={mail}
        open={openDialog === "cancel"}
        onOpenChange={(open) => setOpenDialog(open ? "cancel" : null)}
      />
    </>
  )
}
