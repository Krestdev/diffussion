"use client"

import { useMemo } from "react"
import Link from "next/link"
import type { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/shared/data-table"
import { CircuitRowActions } from "@/components/parametres/circuit-row-actions"
import { useCircuits } from "@/hooks/circuit/useCircuit"
import type { Circuit } from "@/hooks/circuit/type"

export function CircuitsTable() {
  const { data, isLoading } = useCircuits()

  const columns = useMemo<ColumnDef<Circuit>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Nom",
        cell: ({ row }) => (
          <Link
            href={`/administration/parametres/circuits-validation/${row.original.id}`}
            className="hover:underline"
          >
            {row.original.name}
          </Link>
        ),
      },
      {
        id: "dossierType",
        header: "Type de dossier",
        cell: ({ row }) => row.original.dossierType?.name ?? "—",
      },
      {
        id: "role",
        header: "Rôle requis",
        cell: ({ row }) => row.original.role?.name ?? "—",
      },
      {
        id: "steps",
        header: "Étapes",
        cell: ({ row }) =>
          row.original.steps.length > 0
            ? `${row.original.steps.length} étape(s)`
            : "Aucune",
      },
      {
        accessorKey: "createdAt",
        header: "Créé le",
        cell: ({ row }) =>
          new Date(row.original.createdAt).toLocaleDateString("fr-FR"),
      },
      {
        id: "actions",
        header: "Actions",
        meta: { align: "right" },
        cell: ({ row }) => <CircuitRowActions circuit={row.original} />,
      },
    ],
    []
  )

  return (
    <DataTable
      columns={columns}
      data={data ?? []}
      isLoading={isLoading}
      emptyMessage="Aucun circuit"
    />
  )
}
