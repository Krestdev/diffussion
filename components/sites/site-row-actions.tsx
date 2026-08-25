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
import { SiteEditDialog } from "@/components/sites/site-edit-dialog"
import { SiteToggleStatusDialog } from "@/components/sites/site-toggle-status-dialog"
import { SiteViewDialog } from "@/components/sites/site-view-dialog"
import type { Site } from "@/components/sites/types"

type OpenDialog = "view" | "edit" | "toggle-status" | null

export function SiteRowActions({ site }: { site: Site }) {
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
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setOpenDialog("toggle-status")}
          >
            {site.status === "active" ? "Désactiver" : "Activer"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SiteViewDialog
        site={site}
        open={openDialog === "view"}
        onOpenChange={(open) => setOpenDialog(open ? "view" : null)}
      />
      <SiteEditDialog
        site={site}
        open={openDialog === "edit"}
        onOpenChange={(open) => setOpenDialog(open ? "edit" : null)}
      />
      <SiteToggleStatusDialog
        site={site}
        open={openDialog === "toggle-status"}
        onOpenChange={(open) => setOpenDialog(open ? "toggle-status" : null)}
      />
    </>
  )
}
