"use client"

import Link from "next/link"
import { useState } from "react"
import { Ellipsis } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MailAddTaskDialog } from "@/components/courriers/mail-add-task-dialog"
import { MailArchiveDialog } from "@/components/courriers/mail-archive-dialog"
import { MailConfirmDialog } from "@/components/courriers/mail-confirm-dialog"
import { MailDocumentsDialog } from "@/components/courriers/mail-documents-dialog"
import { MailViewDialog } from "@/components/courriers/mail-view-dialog"
import type { Mail } from "@/components/courriers/types"

type OpenDialog =
  "view" | "documents" | "add-task" | "archive" | "complete" | "cancel" | null

export function MailRowActions({ mail }: { mail: Mail }) {
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
          <DropdownMenuItem
            render={<Link href={`/courriers/entrants/${mail.id}/modifier`} />}
          >
            Modifier
          </DropdownMenuItem>
          <DropdownMenuItem
            render={<Link href={`/courriers/entrants/${mail.id}/completer`} />}
          >
            Compléter
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDialog("documents")}>
            Voir les documents
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDialog("add-task")}>
            Ajouter une tâche
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDialog("complete")}>
            Marquer terminé
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={!mail.completed}
            onClick={() => setOpenDialog("archive")}
          >
            Archiver
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setOpenDialog("cancel")}
          >
            Annuler
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <MailViewDialog
        mail={mail}
        open={openDialog === "view"}
        onOpenChange={(open) => setOpenDialog(open ? "view" : null)}
      />
      <MailDocumentsDialog
        mail={mail}
        open={openDialog === "documents"}
        onOpenChange={(open) => setOpenDialog(open ? "documents" : null)}
      />
      <MailAddTaskDialog
        mail={mail}
        open={openDialog === "add-task"}
        onOpenChange={(open) => setOpenDialog(open ? "add-task" : null)}
      />
      <MailArchiveDialog
        mail={mail}
        open={openDialog === "archive"}
        onOpenChange={(open) => setOpenDialog(open ? "archive" : null)}
      />
      <MailConfirmDialog
        title="Marquer comme terminé"
        subtitle={mail.folder}
        description="Confirmer que ce courrier a été entièrement traité ?"
        confirmLabel="Oui, marquer terminé"
        confirmClassName="bg-[#16a34a] text-white hover:bg-[#16a34a]/90"
        open={openDialog === "complete"}
        onOpenChange={(open) => setOpenDialog(open ? "complete" : null)}
      />
      <MailConfirmDialog
        title="Annuler le courrier"
        subtitle={mail.folder}
        description="Êtes-vous sûr de vouloir annuler ce courrier ? Cette action est irréversible."
        confirmLabel="Oui, annuler"
        confirmClassName="bg-destructive text-white hover:bg-destructive/90"
        open={openDialog === "cancel"}
        onOpenChange={(open) => setOpenDialog(open ? "cancel" : null)}
      />
    </>
  )
}
