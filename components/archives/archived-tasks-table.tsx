"use client"

import { useMemo } from "react"
import type { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/shared/data-table"
import { PriorityBadge } from "@/components/shared/priority-badge"
import { toBadgePriority } from "@/lib/priority"
import { ArchivedTaskRowActions } from "@/components/archives/archived-task-row-actions"
import { useInstructions } from "@/hooks/instruction/useInstruction"
import type { Instruction } from "@/hooks/instruction/type"

export function ArchivedTasksTable() {
  const { data, isLoading } = useInstructions({ status: "TERMINEE", take: 100 })

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
        id: "archivedAt",
        header: "Archivé le",
        cell: ({ row }) =>
          row.original.closedAt
            ? new Date(row.original.closedAt).toLocaleDateString("fr-FR")
            : "—",
      },
      {
        id: "actions",
        header: "Actions",
        meta: { align: "right" },
        cell: ({ row }) => <ArchivedTaskRowActions task={row.original} />,
      },
    ],
    []
  )

  return (
    <DataTable
      columns={columns}
      data={data?.data ?? []}
      isLoading={isLoading}
      emptyMessage="Aucune tâche archivée"
    />
  )
}
