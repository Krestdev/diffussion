"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { Role } from "@/components/roles/types"

export function RoleDeleteDialog({
  role,
  open,
  onOpenChange,
}: {
  role: Role
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left text-xl font-semibold tracking-tight normal-case">
            {role.name}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            Êtes-vous sûr de vouloir supprimer ce rôle ? Cette action est
            irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-sm font-medium tracking-normal normal-case">
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-sm font-medium tracking-normal text-white normal-case hover:bg-destructive/90"
            onClick={() => onOpenChange(false)}
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
