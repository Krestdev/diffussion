"use client"

import { use, useState } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Calendar,
  CircleHelp,
  FileText,
  Folder,
  Hash,
  Tag,
  User,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AccessRightsPanel } from "@/components/shared/access-rights-panel"
import { AddTaskDialog } from "@/components/shared/add-task-dialog"
import { CircuitInstancePanel } from "@/components/shared/circuit-instance-panel"
import { CourrierStatusBadge } from "@/components/shared/courrier-status-badge"
import { DocumentListPanel } from "@/components/shared/document-list-panel"
import { InstructionTasksPanel } from "@/components/shared/instruction-tasks-panel"
import { PageHeader } from "@/components/shared/page-header"
import { PriorityBadge } from "@/components/shared/priority-badge"
import { toBadgePriority } from "@/lib/priority"
import { MailArchiveDialog } from "@/components/courriers/mail-archive-dialog"
import { MailConfirmDialog } from "@/components/courriers/mail-confirm-dialog"
import { toast } from "@/components/ui/toast"
import { getApiErrorMessage } from "@/lib/apiError"
import { canSubmitCourrierForCircuit } from "@/lib/courrierCircuit"
import {
  useCancelCourrier,
  useCloseCourrier,
  useCourrier,
  useCourrierAccess,
  useSetCourrierAccess,
  useSubmitCourrierForVerification,
} from "@/hooks/courrier/useCourrier"
import type { CourrierStatus } from "@/hooks/courrier/type"

function InfoRow({
  icon: Icon,
  label,
  value,
  span,
}: {
  icon: LucideIcon
  label: string
  value: React.ReactNode
  span?: boolean
}) {
  return (
    <div className={span ? "col-span-2 flex gap-3" : "flex gap-3"}>
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f4f4f5]">
        <Icon className="size-6 text-[#52525b]" />
      </div>
      <div>
        <p className="text-sm text-[#52525b]">{label}</p>
        <div className="text-sm font-medium text-[#18181b]">{value}</div>
      </div>
    </div>
  )
}

const ENTRANT_OPEN_STATUSES: CourrierStatus[] = [
  "RECU",
  "ENREGISTRE",
  "TRANSMIS",
  "EN_TRAITEMENT",
]

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data: mail, isLoading, isError } = useCourrier(id)
  const [openDialog, setOpenDialog] = useState<
    "complete" | "cancel" | "archive" | "add-task" | null
  >(null)

  const closeCourrier = useCloseCourrier()
  const cancelCourrier = useCancelCourrier()
  const submitForCircuit = useSubmitCourrierForVerification()
  const { data: access, isLoading: accessLoading } = useCourrierAccess(id)
  const setAccess = useSetCourrierAccess()

  if (isError) {
    notFound()
  }

  if (isLoading || !mail) {
    return <p className="text-sm text-[#71717a]">Chargement…</p>
  }

  const isOpen = ENTRANT_OPEN_STATUSES.includes(mail.status)
  const isCompleted = mail.status === "CLOTURE"
  const canSubmitForCircuit = canSubmitCourrierForCircuit(mail)

  function handleSubmitForCircuit() {
    submitForCircuit.mutate(mail!.id, {
      onSuccess: () => toast.add({ title: "Circuit démarré", type: "success" }),
      onError: (error) =>
        toast.add({
          title: "Impossible de démarrer le circuit",
          description: getApiErrorMessage(error, "Veuillez réessayer."),
          type: "error",
        }),
    })
  }

  function handleComplete() {
    closeCourrier.mutate(mail!.id, {
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
    cancelCourrier.mutate(mail!.id, {
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
      <PageHeader
        title={mail.subject}
        subtitle={`${mail.number} · Courrier entrant`}
        backHref="/courriers/entrants"
        action={
          <div className="flex items-center gap-2">
            <Link
              href={`/courriers/entrants/${mail.id}/modifier`}
              className="flex h-11 w-fit items-center justify-center rounded-lg bg-white px-5 text-base font-medium text-[#2f2f2f]"
            >
              Modifier
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" />}>
                Actions
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  render={<Link href={`/courriers/entrants/${mail.id}/completer`} />}
                >
                  Compléter
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpenDialog("add-task")}>
                  Ajouter une tâche
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={!canSubmitForCircuit || submitForCircuit.isPending}
                  onClick={handleSubmitForCircuit}
                >
                  Soumettre pour circuit
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
          </div>
        }
      />

      <div className="grid grid-cols-2 gap-x-6 gap-y-4 rounded-xl border border-[#dfdfdf] p-4">
        <InfoRow
          icon={Hash}
          label="Référence"
          value={
            <span className="rounded bg-[#f2cfde] px-1.5 py-0.5 text-[#2f2f2f]">
              {mail.number}
            </span>
          }
        />
        <InfoRow icon={User} label="Correspondant" value={mail.correspondent?.name ?? "—"} />
        <InfoRow icon={FileText} label="Objet" value={mail.subject} span />
        <InfoRow
          icon={Folder}
          label="Dossier / Projet"
          value={
            <Link href={`/dossiers/${mail.dossier.id}`} className="hover:underline">
              {mail.dossier.title}
            </Link>
          }
        />
        <InfoRow icon={Tag} label="Nature" value={mail.nature?.name ?? "—"} />
        <InfoRow icon={CircleHelp} label="Statut" value={<CourrierStatusBadge status={mail.status} />} />
        <InfoRow
          icon={Calendar}
          label="Enregistré le"
          value={new Date(mail.receivedAt ?? mail.createdAt).toLocaleDateString("fr-FR")}
        />
        <InfoRow icon={Calendar} label="Priorité" value={<PriorityBadge priority={toBadgePriority(mail.dossier.priority)} />} />
      </div>

      <DocumentListPanel courrierId={mail.id} />
      <InstructionTasksPanel courrierId={mail.id} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <AccessRightsPanel
          entries={access}
          isLoading={accessLoading}
          isSaving={setAccess.isPending}
          onSave={(entries) =>
            setAccess.mutate(
              { id: mail.id, body: { entries } },
              {
                onSuccess: () =>
                  toast.add({ title: "Droits d'accès enregistrés", type: "success" }),
                onError: (error) =>
                  toast.add({
                    title: "Échec de l'enregistrement",
                    description: getApiErrorMessage(error, "Veuillez réessayer."),
                    type: "error",
                  }),
              }
            )
          }
        />
        <CircuitInstancePanel courrierId={mail.id} />
      </div>

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
      <MailArchiveDialog
        mail={mail}
        open={openDialog === "archive"}
        onOpenChange={(open) => setOpenDialog(open ? "archive" : null)}
      />
      <AddTaskDialog
        dossierId={mail.dossierId}
        courrierId={mail.id}
        contextLabel={mail.dossier.title}
        open={openDialog === "add-task"}
        onOpenChange={(open) => setOpenDialog(open ? "add-task" : null)}
      />
    </>
  )
}
