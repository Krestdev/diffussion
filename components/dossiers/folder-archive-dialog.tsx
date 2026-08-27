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
import { getApiErrorMessage } from "@/lib/apiError"
import { toast } from "@/components/ui/toast"
import {
  useArchiveDossier,
  useCloseDossier,
  useReopenDossier,
} from "@/hooks/dossier/useDossier"
import type { Dossier } from "@/hooks/dossier/type"

const copy = {
  close: {
    question: "clôturer",
    description:
      "Le dossier ne pourra plus être clôturé tant que ses instructions ne sont pas toutes terminées ou annulées.",
    label: "Clôturer",
  },
  reopen: {
    question: "réouvrir",
    description: "Le dossier redeviendra modifiable.",
    label: "Réouvrir",
  },
  archive: {
    question: "archiver",
    description: "Cette action est irréversible.",
    label: "Archiver",
  },
} as const

export function FolderArchiveDialog({
  folder,
  action,
  open,
  onOpenChange,
}: {
  folder: Dossier
  action: keyof typeof copy
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const closeDossier = useCloseDossier()
  const reopenDossier = useReopenDossier()
  const archiveDossier = useArchiveDossier()

  const mutation =
    action === "close"
      ? closeDossier
      : action === "reopen"
        ? reopenDossier
        : archiveDossier
  const text = copy[action]

  function handleConfirm() {
    mutation.mutate(folder.id, {
      onSuccess: () => {
        toast.add({ title: "Dossier mis à jour", type: "success" })
        onOpenChange(false)
      },
      onError: (error) => {
        toast.add({
          title: "Échec de l'opération",
          description: getApiErrorMessage(error, "Veuillez réessayer."),
          type: "error",
        })
      },
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left text-xl font-semibold tracking-tight normal-case">
            {folder.title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            Êtes-vous sûr de vouloir {text.question} ce dossier ?{" "}
            {text.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-sm font-medium tracking-normal normal-case">
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-[#700032] text-sm font-medium tracking-normal text-white normal-case hover:bg-[#700032]/90"
            disabled={mutation.isPending}
            onClick={handleConfirm}
          >
            {text.label}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
