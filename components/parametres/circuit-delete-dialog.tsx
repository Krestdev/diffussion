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
import { getApiErrorMessage } from "@/lib/apiError"
import { useDeleteCircuit } from "@/hooks/circuit/useCircuit"
import type { Circuit } from "@/hooks/circuit/type"

export function CircuitDeleteDialog({
  circuit,
  open,
  onOpenChange,
  onDeleted,
}: {
  circuit: Circuit
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Called after a successful delete — e.g. to navigate away from the circuit's own detail page. */
  onDeleted?: () => void
}) {
  const deleteCircuit = useDeleteCircuit()

  function handleConfirm() {
    deleteCircuit.mutate(circuit.id, {
      onSuccess: () => {
        toast.add({ title: "Circuit supprimé", type: "success" })
        onOpenChange(false)
        onDeleted?.()
      },
      onError: (error) =>
        toast.add({
          title: "Échec de la suppression",
          description: getApiErrorMessage(error, "Veuillez réessayer."),
          type: "error",
        }),
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left text-xl font-semibold tracking-tight normal-case">
            {circuit.name}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            Êtes-vous sûr de vouloir supprimer ce circuit ? Cette action est
            irréversible et échouera s’il a encore des étapes ou des
            instances en cours.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-sm font-medium tracking-normal normal-case">
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteCircuit.isPending}
            className="bg-destructive text-sm font-medium tracking-normal text-white normal-case hover:bg-destructive/90"
            onClick={(event) => {
              event.preventDefault()
              handleConfirm()
            }}
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
