"use client"

import { useMemo } from "react"
import type { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/shared/data-table"
import { ArchivedMailRowActions } from "@/components/archives/archived-mail-row-actions"
import { ArchivedMailTypeBadge } from "@/components/archives/archived-mail-type-badge"
import { PriorityBadge } from "@/components/shared/priority-badge"
import { toBadgePriority } from "@/lib/priority"
import { useCourriers } from "@/hooks/courrier/useCourrier"
import type { Courrier } from "@/hooks/courrier/type"

export function ArchivedMailsTable() {
  const { data, isLoading } = useCourriers({ status: "ARCHIVE", take: 100 })

  const columns = useMemo<ColumnDef<Courrier>[]>(
    () => [
      { accessorKey: "number", header: "Référence" },
      { accessorKey: "subject", header: "Objet" },
      {
        id: "type",
        header: "Type",
        cell: ({ row }) => <ArchivedMailTypeBadge type={row.original.direction} />,
      },
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
        cell: ({ row }) => <ArchivedMailRowActions mail={row.original} />,
      },
    ],
    []
  )

  return (
    <DataTable
      columns={columns}
      data={data?.data ?? []}
      isLoading={isLoading}
      emptyMessage="Aucun courrier archivé"
    />
  )
}
