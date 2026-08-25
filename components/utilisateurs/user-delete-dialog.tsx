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
import type { AppUser } from "@/components/utilisateurs/types"

export function UserDeleteDialog({
  user,
  open,
  onOpenChange,
}: {
  user: AppUser
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left text-xl font-semibold tracking-tight normal-case">
            {user.fullName}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action
            est irréversible.
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
