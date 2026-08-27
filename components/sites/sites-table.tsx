"use client"

import { useMemo } from "react"
import type { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/shared/data-table"
import { SiteRowActions } from "@/components/sites/site-row-actions"
import { SiteStatusBadge } from "@/components/sites/site-status-badge"
import { useSites } from "@/hooks/site/useSite"
import type { Site } from "@/hooks/site/type"

export function SitesTable() {
  const { data, isLoading } = useSites()

  const columns = useMemo<ColumnDef<Site>[]>(
    () => [
      {
        accessorKey: "code",
        header: "Référence",
      },
      {
        accessorKey: "name",
        header: "Nom du site",
      },
      {
        accessorKey: "city",
        header: "Ville",
        cell: ({ row }) => row.original.city ?? "—",
      },
      {
        id: "responsible",
        header: "Responsable de site",
        cell: ({ row }) => row.original.responsible?.name ?? "—",
      },
      {
        accessorKey: "status",
        header: "Statut",
        cell: ({ row }) => <SiteStatusBadge status={row.original.status} />,
      },
      {
        id: "actions",
        header: "Actions",
        meta: { align: "right" },
        cell: ({ row }) => <SiteRowActions site={row.original} />,
      },
    ],
    []
  )

  return (
    <DataTable
      columns={columns}
      data={data ?? []}
      isLoading={isLoading}
      emptyMessage="Aucun site"
    />
  )
}
