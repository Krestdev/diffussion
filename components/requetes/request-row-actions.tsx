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
import { RequestAcceptDialog } from "@/components/requetes/request-accept-dialog"
import { RequestRejectDialog } from "@/components/requetes/request-reject-dialog"
import { RequestViewDialog } from "@/components/requetes/request-view-dialog"
import type { Request } from "@/components/requetes/types"

type OpenDialog = "view" | "accept" | "reject" | null

export function RequestRowActions({ request }: { request: Request }) {
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
          <DropdownMenuItem onClick={() => setOpenDialog("accept")}>
            Accepter
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setOpenDialog("reject")}
          >
            Rejeter
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <RequestViewDialog
        request={request}
        open={openDialog === "view"}
        onOpenChange={(open) => setOpenDialog(open ? "view" : null)}
      />
      <RequestAcceptDialog
        request={request}
        open={openDialog === "accept"}
        onOpenChange={(open) => setOpenDialog(open ? "accept" : null)}
      />
      <RequestRejectDialog
        request={request}
        open={openDialog === "reject"}
        onOpenChange={(open) => setOpenDialog(open ? "reject" : null)}
      />
    </>
  )
}
