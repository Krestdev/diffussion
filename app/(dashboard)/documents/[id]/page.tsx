"use client"

import { use, useState } from "react"
import Link from "next/link"
import { notFound, useRouter } from "next/navigation"
import { Calendar, Folder, HardDrive, Hash, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AccessRightsPanel } from "@/components/shared/access-rights-panel"
import { AddTaskDialog } from "@/components/shared/add-task-dialog"
import { CircuitInstancePanel } from "@/components/shared/circuit-instance-panel"
import { DocumentPreview } from "@/components/shared/document-preview"
import { PageHeader } from "@/components/shared/page-header"
import { toast } from "@/components/ui/toast"
import { getApiErrorMessage } from "@/lib/apiError"
import {
  useDeleteDocument,
  useDocument,
  useDocumentAccess,
  useDocumentDownloadUrl,
  useSetDocumentAccess,
} from "@/hooks/document/useDocument"
import { useCourrier } from "@/hooks/courrier/useCourrier"
import { useDossier } from "@/hooks/dossier/useDossier"

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Hash
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="flex gap-3">
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

function formatSize(bytes: number | null) {
  if (!bytes) return "—"
  if (bytes < 1024) return `${bytes} o`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`
  return `${(bytes / (1024 * 1024)).toFixed(2)} Mo`
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { data: document, isLoading, isError } = useDocument(id)
  const { data: dossier } = useDossier(document?.dossierId ?? "")
  // A document attaches to exactly one of dossier/courrier/livrable — when
  // it's courrier-attached (e.g. everything uploaded via "Compléter"),
  // there's no direct dossierId, so its real parent view is the courrier,
  // resolved here for both the back arrow and the "Dossier / Projet" row.
  const { data: courrier } = useCourrier(document?.courrierId ?? "")
  const getDownloadUrl = useDocumentDownloadUrl()
  const deleteDocument = useDeleteDocument()
  const { data: access, isLoading: accessLoading } = useDocumentAccess(id)
  const setAccess = useSetDocumentAccess()
  const [addTaskOpen, setAddTaskOpen] = useState(false)

  if (isError) {
    notFound()
  }

  if (isLoading || !document) {
    return <p className="text-sm text-[#71717a]">Chargement…</p>
  }

  // Resolve the document's real parent view: its own dossier if attached
  // directly, otherwise its courrier's detail page (sortant/entrant),
  // otherwise fall back to the dossier list.
  const backHref = dossier
    ? `/dossiers/${dossier.id}`
    : courrier
      ? courrier.direction === "SORTANT"
        ? `/courriers/sortants/${courrier.id}`
        : `/courriers/entrants/${courrier.id}`
      : "/dossiers"
  const resolvedDossierId = document.dossierId ?? courrier?.dossierId ?? null

  function handleDownload() {
    getDownloadUrl.mutate(document!.id, {
      onSuccess: ({ url }) => window.open(url, "_blank", "noopener"),
      onError: () =>
        toast.add({ title: "Échec du téléchargement", type: "error" }),
    })
  }

  function handleDelete() {
    deleteDocument.mutate(document!.id, {
      onSuccess: () => {
        toast.add({ title: "Document supprimé", type: "success" })
        router.back()
      },
      onError: () =>
        toast.add({ title: "Échec de la suppression", type: "error" }),
    })
  }

  return (
    <>
      <PageHeader
        title={document.originalName}
        subtitle="Document"
        backHref={backHref}
        action={
          <div className="flex items-center gap-2">
            {resolvedDossierId && (
              <Button
                variant="outline"
                className="h-11 rounded-lg px-5 text-base font-medium normal-case"
                onClick={() => setAddTaskOpen(true)}
              >
                Ajouter une tâche
              </Button>
            )}
            <Button
              variant="outline"
              className="h-11 rounded-lg px-5 text-base font-medium normal-case"
              disabled={getDownloadUrl.isPending}
              onClick={handleDownload}
            >
              Télécharger
            </Button>
            <Button
              className="h-11 rounded-lg bg-destructive px-5 text-base font-medium text-white normal-case hover:bg-destructive/90"
              disabled={deleteDocument.isPending}
              onClick={handleDelete}
            >
              Supprimer
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-2 gap-x-6 gap-y-4 rounded-xl border border-[#dfdfdf] p-4">
        <InfoRow icon={Hash} label="Nom du fichier" value={document.originalName} />
        <InfoRow icon={HardDrive} label="Taille" value={formatSize(document.sizeBytes)} />
        <InfoRow
          icon={Folder}
          label="Dossier / Projet"
          value={
            dossier ? (
              <Link href={`/dossiers/${dossier.id}`} className="hover:underline">
                {dossier.title}
                {dossier.project ? ` — ${dossier.project.name}` : ""}
              </Link>
            ) : courrier ? (
              <Link href={`/dossiers/${courrier.dossier.id}`} className="hover:underline">
                {courrier.dossier.title}
              </Link>
            ) : (
              "—"
            )
          }
        />
        <InfoRow icon={User} label="Type" value={document.mimeType ?? "—"} />
        <InfoRow
          icon={Calendar}
          label="Ajouté le"
          value={new Date(document.createdAt).toLocaleDateString("fr-FR")}
        />
      </div>

      <DocumentPreview
        documentId={document.id}
        mimeType={document.mimeType}
        originalName={document.originalName}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <AccessRightsPanel
          entries={access}
          isLoading={accessLoading}
          isSaving={setAccess.isPending}
          onSave={(entries) =>
            setAccess.mutate(
              { id: document.id, body: { entries } },
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
        <CircuitInstancePanel documentId={document.id} />
      </div>

      {resolvedDossierId && (
        <AddTaskDialog
          dossierId={resolvedDossierId}
          courrierId={document.courrierId ?? undefined}
          contextLabel={dossier?.title ?? courrier?.dossier.title ?? document.originalName}
          open={addTaskOpen}
          onOpenChange={setAddTaskOpen}
        />
      )}
    </>
  )
}
