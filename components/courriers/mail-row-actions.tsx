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
import { toast } from "@/components/ui/toast"
import { getApiErrorMessage } from "@/lib/apiError"
import { MailArchiveDialog } from "@/components/courriers/mail-archive-dialog"
import { MailConfirmDialog } from "@/components/courriers/mail-confirm-dialog"
import { AddTaskDialog } from "@/components/shared/add-task-dialog"
import { GrantCourrierAccessDialog } from "@/components/shared/grant-courrier-access-dialog"
import { useCancelCourrier, useCloseCourrier } from "@/hooks/courrier/useCourrier"
import type { Courrier, CourrierStatus } from "@/hooks/courrier/type"

type OpenDialog = "add-task" | "archive" | "complete" | "cancel" | "grant-access" | null

const ENTRANT_OPEN_STATUSES: CourrierStatus[] = [
  "RECU",
  "ENREGISTRE",
  "TRANSMIS",
  "EN_TRAITEMENT",
]

// "Voir" now opens the full detail page (documents, tasks, access rights,
// circuit) — see app/(dashboard)/courriers/entrants/[id]/page.tsx.
export function MailRowActions({ mail }: { mail: Courrier }) {
  const [openDialog, setOpenDialog] = useState<OpenDialog>(null)
  const closeCourrier = useCloseCourrier()
  const cancelCourrier = useCancelCourrier()

  const isOpen = ENTRANT_OPEN_STATUSES.includes(mail.status)
  const isCompleted = mail.status === "CLOTURE"

  function handleComplete() {
    closeCourrier.mutate(mail.id, {
      onSuccess: () => {
        toast.add({ title: "Courrier marqué comme terminé", type: "success" })
        setOpenDialog(null)
      },
      onError: (error) =>
        toast.add({
          title: "Échec de l'opération",
          description: getApiErrorMessage(error, "Veuillez réessayer."),
          type: "error",
        }),
    })
  }

  function handleCancel() {
    cancelCourrier.mutate(mail.id, {
      onSuccess: () => {
        toast.add({ title: "Courrier annulé", type: "success" })
        setOpenDialog(null)
      },
      onError: (error) =>
        toast.add({
          title: "Échec de l'annulation",
          description: getApiErrorMessage(error, "Veuillez réessayer."),
          type: "error",
        }),
    })
  }

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
          <DropdownMenuItem
            render={<Link href={`/courriers/entrants/${mail.id}`} />}
          >
            Voir
          </DropdownMenuItem>
          <DropdownMenuItem
            render={<Link href={`/courriers/entrants/${mail.id}/modifier`} />}
          >
            Modifier
          </DropdownMenuItem>
          {/* "Compléter" creates an Instruction from this courrier — deferred
              to the Instructions phase; still points at the (mock) page. */}
          <DropdownMenuItem
            render={<Link href={`/courriers/entrants/${mail.id}/completer`} />}
          >
            Compléter
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDialog("add-task")}>
            Ajouter une tâche
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDialog("grant-access")}>
            Accorder l&apos;accès
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={!isOpen}
            onClick={() => setOpenDialog("complete")}
          >
            Marquer terminé
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={!isCompleted}
            onClick={() => setOpenDialog("archive")}
          >
            Archiver
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            disabled={!isOpen}
            onClick={() => setOpenDialog("cancel")}
          >
            Annuler
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AddTaskDialog
        dossierId={mail.dossierId}
        courrierId={mail.id}
        contextLabel={mail.dossier.title}
        open={openDialog === "add-task"}
        onOpenChange={(open) => setOpenDialog(open ? "add-task" : null)}
      />
      <GrantCourrierAccessDialog
        courrierId={mail.id}
        subtitle={mail.subject}
        open={openDialog === "grant-access"}
        onOpenChange={(open) => setOpenDialog(open ? "grant-access" : null)}
      />
      <MailArchiveDialog
        mail={mail}
        open={openDialog === "archive"}
        onOpenChange={(open) => setOpenDialog(open ? "archive" : null)}
      />
      <MailConfirmDialog
        title="Marquer comme terminé"
        subtitle={mail.dossier.title}
        description="Confirmer que ce courrier a été entièrement traité ?"
        confirmLabel="Oui, marquer terminé"
        confirmClassName="bg-[#16a34a] text-white hover:bg-[#16a34a]/90"
        onConfirm={handleComplete}
        isPending={closeCourrier.isPending}
        open={openDialog === "complete"}
        onOpenChange={(open) => setOpenDialog(open ? "complete" : null)}
      />
      <MailConfirmDialog
        title="Annuler le courrier"
        subtitle={mail.dossier.title}
        description="Êtes-vous sûr de vouloir annuler ce courrier ? Cette action est irréversible."
        confirmLabel="Oui, annuler"
        confirmClassName="bg-destructive text-white hover:bg-destructive/90"
        onConfirm={handleCancel}
        isPending={cancelCourrier.isPending}
        open={openDialog === "cancel"}
        onOpenChange={(open) => setOpenDialog(open ? "cancel" : null)}
      />
    </>
  )
}
