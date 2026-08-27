"use client"

import { useMemo } from "react"
import type { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/shared/data-table"
import { PriorityBadge } from "@/components/shared/priority-badge"
import { toBadgePriority } from "@/lib/priority"
import { ApprobationRowActions } from "@/components/courriers-sortants/approbation-row-actions"
import { useCircuitInstances } from "@/hooks/circuitInstance/useCircuitInstance"
import type { CircuitInstance } from "@/hooks/circuitInstance/type"

// Circuits attach to a courrier (either direction) or a document — this
// inbox surfaces a pending step regardless of which, since all three
// eventually need the same "someone must act on this" queue. Renders off
// instance.dossier (present for every target type) rather than
// courrier.dossier, which is only populated for courrier-attached instances.
function targetLabel(instance: CircuitInstance) {
  if (instance.courrier) {
    return instance.courrier.direction === "SORTANT" ? "Courrier sortant" : "Courrier entrant"
  }
  if (instance.document) return "Document"
  return "—"
}

function targetReference(instance: CircuitInstance) {
  return instance.courrier?.number ?? instance.document?.originalName ?? "—"
}

function targetSubject(instance: CircuitInstance) {
  return instance.courrier?.subject ?? instance.document?.originalName ?? "—"
}

function targetCreatedAt(instance: CircuitInstance) {
  return instance.courrier?.createdAt ?? instance.document?.createdAt ?? null
}

export function ApprobationTable() {
  const { data, isLoading } = useCircuitInstances({ status: "IN_PROGRESS" })
  const pendingApprovals = data ?? []

  const columns = useMemo<ColumnDef<CircuitInstance>[]>(
    () => [
      {
        id: "type",
        header: "Type",
        cell: ({ row }) => targetLabel(row.original),
      },
      {
        id: "reference",
        header: "Référence",
        cell: ({ row }) => targetReference(row.original),
      },
      {
        id: "subject",
        header: "Objet",
        cell: ({ row }) => targetSubject(row.original),
      },
      {
        id: "dossier",
        header: "Dossier",
        cell: ({ row }) => row.original.dossier?.title ?? "—",
      },
      {
        id: "priority",
        header: "Priorité",
        cell: ({ row }) =>
          row.original.dossier ? (
            <PriorityBadge priority={toBadgePriority(row.original.dossier.priority)} />
          ) : null,
      },
      {
        id: "step",
        header: "Étape en cours",
        cell: ({ row }) =>
          `${row.original.currentStep.order}. ${row.original.currentStep.actionType ?? "Étape"}${
            row.original.currentStep.role ? ` — ${row.original.currentStep.role.name}` : ""
          }`,
      },
      {
        id: "createdAt",
        header: "Enregistré le",
        cell: ({ row }) => {
          const createdAt = targetCreatedAt(row.original)
          return createdAt ? new Date(createdAt).toLocaleDateString("fr-FR") : null
        },
      },
      {
        id: "actions",
        header: "Actions",
        meta: { align: "right" },
        cell: ({ row }) => <ApprobationRowActions instance={row.original} />,
      },
    ],
    []
  )

  return (
    <DataTable
      columns={columns}
      data={pendingApprovals}
      isLoading={isLoading}
      emptyMessage="Aucun élément en attente d'approbation"
    />
  )
}
