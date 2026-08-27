"use client"

import { useMemo } from "react"
import type { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/shared/data-table"
import { ArchivedFolderRowActions } from "@/components/archives/archived-folder-row-actions"
import { useDossiers } from "@/hooks/dossier/useDossier"
import type { Dossier } from "@/hooks/dossier/type"

export function ArchivedFoldersTable() {
  const { data, isLoading } = useDossiers({ status: "ARCHIVED", take: 100 })

  const columns = useMemo<ColumnDef<Dossier>[]>(
    () => [
      { accessorKey: "number", header: "Référence" },
      { accessorKey: "title", header: "Intitulé" },
      {
        id: "courriers",
        header: "Courriers",
        cell: ({ row }) => row.original._count.courriers,
      },
      {
        id: "site",
        header: "Site",
        cell: ({ row }) => row.original.site.name,
      },
      {
        id: "type",
        header: "Type",
        cell: ({ row }) => row.original.type?.name ?? "—",
      },
      {
        id: "archivedAt",
        header: "Archivé le",
        cell: ({ row }) =>
          row.original.archivedAt
            ? new Date(row.original.archivedAt).toLocaleDateString("fr-FR")
            : "—",
      },
      {
        id: "actions",
        header: "Actions",
        meta: { align: "right" },
        cell: ({ row }) => <ArchivedFolderRowActions folder={row.original} />,
      },
    ],
    []
  )

  return (
    <DataTable
      columns={columns}
      data={data?.data ?? []}
      isLoading={isLoading}
      emptyMessage="Aucun dossier archivé"
    />
  )
}
