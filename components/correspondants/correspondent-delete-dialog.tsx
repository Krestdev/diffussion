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
import { toast } from "@/components/ui/toast"
import { useDeleteCorrespondent } from "@/hooks/correspondent/useCorrespondent"
import type { Correspondent } from "@/hooks/correspondent/type"

export function CorrespondentDeleteDialog({
  correspondent,
  open,
  onOpenChange,
}: {
  correspondent: Correspondent
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const deleteCorrespondent = useDeleteCorrespondent()

  function handleDelete() {
    deleteCorrespondent.mutate(correspondent.id, {
      onSuccess: () => {
        toast.add({ title: "Correspondant supprimé", type: "success" })
        onOpenChange(false)
      },
      onError: () =>
        toast.add({
          title: "Échec de la suppression",
          description: "Veuillez réessayer.",
          type: "error",
        }),
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left text-xl font-semibold tracking-tight normal-case">
            {correspondent.name}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            Êtes-vous sûr de vouloir supprimer ce correspondant ? Cette action
            est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-sm font-medium tracking-normal normal-case">
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-sm font-medium tracking-normal text-white normal-case hover:bg-destructive/90"
            disabled={deleteCorrespondent.isPending}
            onClick={handleDelete}
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
