"use client"

import { use, useState } from "react"
import { notFound, useRouter } from "next/navigation"
import {
  Calendar,
  Ellipsis,
  FolderOpen,
  Hash,
  ShieldCheck,
  Star,
  Workflow,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PageHeader } from "@/components/shared/page-header"
import { CircuitFormDialog } from "@/components/parametres/circuit-form-dialog"
import { CircuitDeleteDialog } from "@/components/parametres/circuit-delete-dialog"
import { CircuitStepsManager } from "@/components/parametres/circuit-steps-manager"
import { CircuitConcernedDossiersTable } from "@/components/parametres/circuit-concerned-dossiers-table"
import { useCircuitDetail } from "@/hooks/circuit/useCircuit"

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
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

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { data: circuit, isLoading, isError } = useCircuitDetail(id)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  if (isError) {
    notFound()
  }

  if (isLoading || !circuit) {
    return <p className="text-sm text-[#71717a]">Chargement…</p>
  }

  return (
    <>
      <PageHeader
        title={circuit.name}
        subtitle="Circuit de validation"
        backHref="/administration/parametres/circuits-validation"
        variant="secondary"
        action={
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
              <DropdownMenuItem onClick={() => setEditOpen(true)}>
                Modifier
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={() => setDeleteOpen(true)}
              >
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      />

      <div className="grid grid-cols-2 gap-x-6 gap-y-4 rounded-xl border border-[#dfdfdf] p-4">
        <InfoRow
          icon={Hash}
          label="Nom"
          value={
            <span className="rounded bg-[#f2cfde] px-1.5 py-0.5 text-[#2f2f2f]">
              {circuit.name}
            </span>
          }
        />
        <InfoRow
          icon={Star}
          label="Type de dossier"
          value={circuit.dossierType?.name ?? "Tous types"}
        />
        <InfoRow
          icon={ShieldCheck}
          label="Rôle requis"
          value={circuit.role?.name ?? "Aucun"}
        />
        <InfoRow
          icon={Workflow}
          label="Étapes"
          value={
            circuit.steps.length > 0 ? `${circuit.steps.length} étape(s)` : "Aucune"
          }
        />
        <InfoRow
          icon={Calendar}
          label="Créé le"
          value={new Date(circuit.createdAt).toLocaleDateString("fr-FR")}
        />
        <InfoRow
          icon={Calendar}
          label="Modifié le"
          value={new Date(circuit.updatedAt).toLocaleDateString("fr-FR")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Workflow className="size-5 text-[#52525b]" />
          <p className="text-base font-semibold text-[#18181b]">
            Étapes du circuit
          </p>
        </div>
        <CircuitStepsManager circuitId={circuit.id} />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <FolderOpen className="size-5 text-[#52525b]" />
          <p className="text-base font-semibold text-[#18181b]">
            Dossiers, courriers et documents concernés
          </p>
        </div>
        <CircuitConcernedDossiersTable dossierTypeId={circuit.dossierTypeId} />
      </div>

      <CircuitFormDialog circuit={circuit} open={editOpen} onOpenChange={setEditOpen} />
      <CircuitDeleteDialog
        circuit={circuit}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onDeleted={() => router.push("/administration/parametres/circuits-validation")}
      />
    </>
  )
}
