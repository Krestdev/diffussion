"use client"

import { useMemo } from "react"
import type { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/shared/data-table"
import { PriorityBadge } from "@/components/shared/priority-badge"
import { toBadgePriority } from "@/lib/priority"
import { StatusBadge } from "@/components/taches/status-badge"
import { taskStatusBucket } from "@/components/taches/types"
import { TaskRowActions } from "@/components/taches/task-row-actions"
import type { Instruction, InstructionPriority } from "@/hooks/instruction/type"

/** Highlights a row background for priorities that need attention, matched to the Figma spec. */
const rowHighlight: Record<InstructionPriority, string> = {
  URGENT: "bg-[#fef2f2] hover:bg-[#fef2f2]",
  NORMAL: "",
  LOW: "",
}

export function TasksTable({
  tasks,
  isLoading,
}: {
  tasks: Instruction[]
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
        id: "status",
        header: "Statut",
        cell: ({ row }) => (
          <StatusBadge status={taskStatusBucket(row.original.status)} />
        ),
      },
      {
        id: "actions",
        header: "Actions",
        meta: { align: "right" },
        cell: ({ row }) => <TaskRowActions task={row.original} />,
      },
    ],
    []
  )

  return (
    <DataTable
      columns={columns}
      data={tasks}
      isLoading={isLoading}
      emptyMessage="Aucune tâche"
      rowClassName={(task) => rowHighlight[task.priority]}
    />
  )
}
