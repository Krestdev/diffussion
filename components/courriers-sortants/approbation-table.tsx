"use client"

import { useMemo } from "react"
import type { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/shared/data-table"
import { PriorityBadge } from "@/components/shared/priority-badge"
import { toBadgePriority } from "@/lib/priority"
import { ApprobationRowActions } from "@/components/courriers-sortants/approbation-row-actions"
import { useCourriers } from "@/hooks/courrier/useCourrier"
import type { Courrier, CourrierStatus } from "@/hooks/courrier/type"

const PENDING_STATUSES: CourrierStatus[] = ["EN_VERIFICATION", "EN_VALIDATION"]

export function ApprobationTable() {
  const { data, isLoading } = useCourriers({ direction: "SORTANT", take: 100 })
  const pendingApprovals =
    data?.data.filter((mail) => PENDING_STATUSES.includes(mail.status)) ?? []

  const columns = useMemo<ColumnDef<Courrier>[]>(
    () => [
      { accessorKey: "number", header: "Référence" },
      { accessorKey: "subject", header: "Objet" },
      {
        id: "dossier",
        header: "Dossier",
        cell: ({ row }) => row.original.dossier.title,
      },
      {
        id: "priority",
        header: "Priorité",
        cell: ({ row }) => (
          <PriorityBadge priority={toBadgePriority(row.original.dossier.priority)} />
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Enregistré le",
        cell: ({ row }) =>
          new Date(row.original.createdAt).toLocaleDateString("fr-FR"),
      },
      {
        id: "actions",
        header: "Actions",
        meta: { align: "right" },
        cell: ({ row }) => <ApprobationRowActions mail={row.original} />,
      },
    ],
    []
  )

  return (
    <DataTable
      columns={columns}
      data={pendingApprovals}
      isLoading={isLoading}
      emptyMessage="Aucun courrier en attente d'approbation"
    />
  )
}
