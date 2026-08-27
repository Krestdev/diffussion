"use client"

import { useMemo } from "react"
import type { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/shared/data-table"
import { PriorityBadge } from "@/components/shared/priority-badge"
import { toBadgePriority } from "@/lib/priority"
import { RequestRowActions } from "@/components/requetes/request-row-actions"
import type { Instruction } from "@/hooks/instruction/type"

export function RequestsTable({
  requests,
  isLoading,
}: {
  requests: Instruction[]
  isLoading?: boolean
}) {
  const columns = useMemo<ColumnDef<Instruction>[]>(
    () => [
      { accessorKey: "number", header: "Référence" },
      { accessorKey: "title", header: "Titre" },
      {
        id: "dossier",
        header: "Dossier",
        cell: ({ row }) => row.original.dossier.title,
      },
      {
        id: "priority",
        header: "Priorité",
        cell: ({ row }) => (
          <PriorityBadge priority={toBadgePriority(row.original.priority)} />
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Reçu le",
        cell: ({ row }) =>
          new Date(row.original.createdAt).toLocaleDateString("fr-FR"),
      },
      {
        id: "actions",
        header: "Actions",
        meta: { align: "right" },
        cell: ({ row }) => <RequestRowActions request={row.original} />,
      },
    ],
    []
  )

  return (
    <DataTable
      columns={columns}
      data={requests}
      isLoading={isLoading}
      emptyMessage="Aucune demande"
    />
  )
}
