"use client"

import { use, useState } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Archive,
  Asterisk,
  Calendar,
  CircleHelp,
  Hash,
  SquareUserRound,
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
import { OutgoingMailCancelDialog } from "@/components/courriers-sortants/outgoing-mail-cancel-dialog"
import { toast } from "@/components/ui/toast"
import { getApiErrorMessage } from "@/lib/apiError"
import {
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

const EDITABLE_STATUSES: CourrierStatus[] = ["BROUILLON", "A_CORRIGER"]
const CANCELLABLE_STATUSES: CourrierStatus[] = [
  "BROUILLON",
  "EN_CIRCUIT",
  "A_CORRIGER",
]

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data: mail, isLoading, isError } = useCourrier(id)
  const [cancelOpen, setCancelOpen] = useState(false)
  const [addTaskOpen, setAddTaskOpen] = useState(false)
  const submitForVerification = useSubmitCourrierForVerification()
  const { data: access, isLoading: accessLoading } = useCourrierAccess(id)
  const setAccess = useSetCourrierAccess()

  if (isError) {
    notFound()
  }

  if (isLoading || !mail) {
    return <p className="text-sm text-[#71717a]">Chargement…</p>
  }

  function handleSubmitForVerification() {
    submitForVerification.mutate(mail!.id, {
      onSuccess: () =>
        toast.add({ title: "Courrier soumis pour vérification", type: "success" }),
      onError: (error) =>
        toast.add({
          title: "Échec de la soumission",
          description: getApiErrorMessage(error, "Veuillez réessayer."),
          type: "error",
        }),
    })
  }

  return (
    <>
      <PageHeader
        title={mail.subject}
        subtitle={`${mail.number} · Courrier sortant`}
        backHref="/courriers/sortants"
        action={
          <div className="flex items-center gap-2">
            {EDITABLE_STATUSES.includes(mail.status) && (
              <Link
                href={`/courriers/sortants/${mail.id}/modifier`}
                className="flex h-11 w-fit items-center justify-center rounded-lg bg-white px-5 text-base font-medium text-[#2f2f2f]"
              >
                Modifier
              </Link>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" />}>
                Actions
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setAddTaskOpen(true)}>
                  Ajouter une tâche
                </DropdownMenuItem>
                {EDITABLE_STATUSES.includes(mail.status) && (
                  <DropdownMenuItem
                    disabled={submitForVerification.isPending}
                    onClick={handleSubmitForVerification}
                  >
                    Soumettre pour vérification
                  </DropdownMenuItem>
                )}
                {CANCELLABLE_STATUSES.includes(mail.status) && (
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => setCancelOpen(true)}
                  >
                    Annuler
                  </DropdownMenuItem>
                )}
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
        <InfoRow icon={SquareUserRound} label="Correspondant" value={mail.correspondent?.name ?? "—"} />
        <InfoRow icon={Asterisk} label="Nature" value={mail.nature?.name ?? "—"} />
        <InfoRow
          icon={Archive}
          label="Dossier / Projet"
          value={
            <Link href={`/dossiers/${mail.dossier.id}`} className="hover:underline">
              {mail.dossier.title}
            </Link>
          }
        />
        <InfoRow icon={CircleHelp} label="Statut" value={<CourrierStatusBadge status={mail.status} />} />
        <InfoRow
          icon={Calendar}
          label="Créé le"
          value={new Date(mail.createdAt).toLocaleDateString("fr-FR")}
        />
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

      <OutgoingMailCancelDialog
        mail={mail}
        open={cancelOpen}
        onOpenChange={setCancelOpen}
      />
      <AddTaskDialog
        dossierId={mail.dossierId}
        courrierId={mail.id}
        contextLabel={mail.dossier.title}
        open={addTaskOpen}
        onOpenChange={setAddTaskOpen}
      />
    </>
  )
}
