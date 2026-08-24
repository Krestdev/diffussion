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
import { ApprobationConfirmDialog } from "@/components/courriers-sortants/approbation-confirm-dialog"
import { ApprobationViewDialog } from "@/components/courriers-sortants/approbation-view-dialog"
import type { OutgoingMail } from "@/components/courriers-sortants/types"

type OpenDialog = "view" | "approve" | null

export function ApprobationRowActions({ mail }: { mail: OutgoingMail }) {
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
          <DropdownMenuItem onClick={() => setOpenDialog("approve")}>
            Approuver
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ApprobationViewDialog
        mail={mail}
        open={openDialog === "view"}
        onOpenChange={(open) => setOpenDialog(open ? "view" : null)}
      />
      <ApprobationConfirmDialog
        title={mail.subject}
        subtitle="Courrier sortant"
        description="Êtes-vous sûr de vouloir approuver ce courrier ? Cette action est irréversible."
        confirmLabel="Oui, approuver"
        confirmClassName="bg-[#16a34a] text-white hover:bg-[#16a34a]/90"
        cancelLabel="Annuler"
        variant="success"
        open={openDialog === "approve"}
        onOpenChange={(open) => setOpenDialog(open ? "approve" : null)}
      />
    </>
  )
}
