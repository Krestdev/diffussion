"use client"

import { useMemo } from "react"
import type { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/shared/data-table"
import { PriorityBadge } from "@/components/shared/priority-badge"
import { toBadgePriority } from "@/lib/priority"
import { OutgoingMailRowActions } from "@/components/courriers-sortants/outgoing-mail-row-actions"
import type { Courrier } from "@/hooks/courrier/type"

export function OutgoingMailsTable({
  mails,
  isLoading,
}: {
  mails: Courrier[]
  isLoading?: boolean
}) {
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
        id: "correspondent",
        header: "Correspondant",
        cell: ({ row }) => row.original.correspondent?.name ?? "—",
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
        cell: ({ row }) => <OutgoingMailRowActions mail={row.original} />,
      },
    ],
    []
  )

  return (
    <DataTable
      columns={columns}
      data={mails}
      isLoading={isLoading}
      emptyMessage="Aucun courrier dans cette catégorie"
    />
  )
}
