"use client"

import { useMemo } from "react"
import type { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/shared/data-table"
import { CorrespondentRowActions } from "@/components/correspondants/correspondent-row-actions"
import { CorrespondentStatusBadge } from "@/components/correspondants/correspondent-status-badge"
import { useCorrespondents } from "@/hooks/correspondent/useCorrespondent"
import type { Correspondent } from "@/hooks/correspondent/type"

export function CorrespondentsTable() {
  const { data, isLoading } = useCorrespondents()

  const columns = useMemo<ColumnDef<Correspondent>[]>(
    () => [
      {
        accessorKey: "code",
        header: "Référence",
      },
      {
        accessorKey: "name",
        header: "Nom / Raison sociale",
      },
      {
        accessorKey: "city",
        header: "Ville",
        cell: ({ row }) => row.original.city ?? "—",
      },
      {
        id: "type",
        header: "Type",
        cell: ({ row }) => row.original.type?.name ?? "—",
      },
      {
        accessorKey: "status",
        header: "Statut",
        cell: ({ row }) => (
          <CorrespondentStatusBadge status={row.original.status} />
        ),
      },
      {
        id: "actions",
        header: "Actions",
        meta: { align: "right" },
        cell: ({ row }) => (
          <CorrespondentRowActions correspondent={row.original} />
        ),
      },
    ],
    []
  )

  return (
    <DataTable
      columns={columns}
      data={data?.data ?? []}
      isLoading={isLoading}
      emptyMessage="Aucun correspondant"
    />
  )
}
