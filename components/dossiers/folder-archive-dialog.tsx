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
import type { Folder } from "@/components/dossiers/types"

export function FolderArchiveDialog({
  folder,
  open,
  onOpenChange,
}: {
  folder: Folder
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left text-xl font-semibold tracking-tight normal-case">
            {folder.title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            Êtes-vous sûr de vouloir archiver ce dossier ? Cette action est
            irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-sm font-medium tracking-normal normal-case">
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-[#700032] text-sm font-medium tracking-normal text-white normal-case hover:bg-[#700032]/90"
            onClick={() => onOpenChange(false)}
          >
            Archiver
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
