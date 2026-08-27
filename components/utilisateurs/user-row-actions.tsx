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
import { UserDeleteDialog } from "@/components/utilisateurs/user-delete-dialog"
import { UserEditDialog } from "@/components/utilisateurs/user-edit-dialog"
import { UserSuspendDialog } from "@/components/utilisateurs/user-suspend-dialog"
import { UserViewDialog } from "@/components/utilisateurs/user-view-dialog"
import type { AppUser } from "@/hooks/adminUser/type"

type OpenDialog = "view" | "edit" | "suspend" | "delete" | null

export function UserRowActions({ user }: { user: AppUser }) {
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
          <DropdownMenuItem onClick={() => setOpenDialog("suspend")}>
            {user.status === "ACTIVE" ? "Suspendre" : "Réactiver"}
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setOpenDialog("delete")}
          >
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UserViewDialog
        user={user}
        open={openDialog === "view"}
        onOpenChange={(open) => setOpenDialog(open ? "view" : null)}
      />
      <UserEditDialog
        user={user}
        open={openDialog === "edit"}
        onOpenChange={(open) => setOpenDialog(open ? "edit" : null)}
      />
      <UserSuspendDialog
        user={user}
        open={openDialog === "suspend"}
        onOpenChange={(open) => setOpenDialog(open ? "suspend" : null)}
      />
      <UserDeleteDialog
        user={user}
        open={openDialog === "delete"}
        onOpenChange={(open) => setOpenDialog(open ? "delete" : null)}
      />
    </>
  )
}
