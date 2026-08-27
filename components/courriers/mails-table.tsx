"use client"

import { useMemo } from "react"
import type { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/shared/data-table"
import { MailRowActions } from "@/components/courriers/mail-row-actions"
import { PriorityBadge } from "@/components/shared/priority-badge"
import { toBadgePriority } from "@/lib/priority"
import { useCourriers } from "@/hooks/courrier/useCourrier"
import type { Courrier } from "@/hooks/courrier/type"

export function MailsTable() {
  const { data, isLoading } = useCourriers({ direction: "ENTRANT" })

  const columns = useMemo<ColumnDef<Courrier>[]>(
    () => [
      {
        accessorKey: "number",
        header: "Référence",
      },
      {
        accessorKey: "subject",
        header: "Objet",
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
        id: "registeredAt",
        header: "Enregistré le",
        cell: ({ row }) =>
          new Date(
            row.original.receivedAt ?? row.original.createdAt
          ).toLocaleDateString("fr-FR"),
      },
      {
        id: "actions",
        header: "Actions",
        meta: { align: "right" },
        cell: ({ row }) => <MailRowActions mail={row.original} />,
      },
    ],
    []
  )

  return (
    <DataTable
      columns={columns}
      data={data?.data ?? []}
      isLoading={isLoading}
      emptyMessage="Aucun courrier"
    />
  )
}
