"use client"

import { use, useState } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Briefcase,
  Calendar,
  CircleHelp,
  Ellipsis,
  FolderOpen,
  Hash,
  Map,
  SquareUserRound,
  Star,
  TextQuote,
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
import { CircuitStubPanel } from "@/components/shared/circuit-stub-panel"
import { DossierContentsTable } from "@/components/dossiers/dossier-contents-table"
import { FolderStatusBadge } from "@/components/dossiers/folder-status-badge"
import { GrantDossierAccessDialog } from "@/components/shared/grant-dossier-access-dialog"
import { PageHeader } from "@/components/shared/page-header"
import { toast } from "@/components/ui/toast"
import { getApiErrorMessage } from "@/lib/apiError"
import {
  useDossier,
  useDossierAccess,
  useSetDossierAccess,
} from "@/hooks/dossier/useDossier"

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

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data: dossier, isLoading, isError } = useDossier(id)
  const { data: access, isLoading: accessLoading } = useDossierAccess(id)
  const setAccess = useSetDossierAccess()
  const [grantOpen, setGrantOpen] = useState(false)

  if (isError) {
    notFound()
  }

  if (isLoading || !dossier) {
    return <p className="text-sm text-[#71717a]">Chargement…</p>
  }

  return (
    <>
      <PageHeader
        title={dossier.title}
        subtitle={dossier.number}
        backHref="/dossiers"
        action={
          <div className="flex items-center gap-2">
            <Link
              href={`/dossiers/${dossier.id}/modifier`}
              className="flex h-11 w-fit items-center justify-center rounded-lg bg-white px-5 text-base font-medium text-[#2f2f2f]"
            >
              Modifier
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="outline" size="icon" className="rounded-lg bg-white" />
                }
              >
                <Ellipsis className="size-4" />
                <span className="sr-only">Actions</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setGrantOpen(true)}>
                  Accorder l&apos;accès
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
              {dossier.number}
            </span>
          }
        />
        <InfoRow
          icon={SquareUserRound}
          label="Responsable du Dossier"
          value={dossier.responsible?.name ?? "—"}
        />
        <InfoRow
          icon={TextQuote}
          label="Description"
          value={dossier.description ?? "—"}
          span
        />
        <InfoRow icon={Star} label="Type" value={dossier.type?.name ?? "—"} />
        <InfoRow
          icon={Briefcase}
          label="Projet"
          value={dossier.project?.name ?? "—"}
        />
        <InfoRow icon={Map} label="Site" value={dossier.site.name} />
        <InfoRow
          icon={CircleHelp}
          label="Statut"
          value={<FolderStatusBadge status={dossier.status} />}
        />
        <InfoRow
          icon={Calendar}
          label="Créé le"
          value={new Date(dossier.createdAt).toLocaleDateString("fr-FR")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <FolderOpen className="size-5 text-[#52525b]" />
          <p className="text-base font-semibold text-[#18181b]">Contenu</p>
        </div>
        <DossierContentsTable dossierId={dossier.id} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <AccessRightsPanel
          entries={access}
          isLoading={accessLoading}
          isSaving={setAccess.isPending}
          onSave={(entries) =>
            setAccess.mutate(
              { id: dossier.id, body: { entries } },
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
        <CircuitStubPanel />
      </div>

      <GrantDossierAccessDialog
        dossierId={dossier.id}
        subtitle={dossier.title}
        open={grantOpen}
        onOpenChange={setGrantOpen}
      />
    </>
  )
}
