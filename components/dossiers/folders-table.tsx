"use client"

import { useMemo } from "react"
import { Eye, Lock } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/shared/data-table"
import { FolderIcon } from "@/components/dossiers/folder-icon"
import { FolderRowActions } from "@/components/dossiers/folder-row-actions"
import { useDossiers } from "@/hooks/dossier/useDossier"
import type { Dossier } from "@/hooks/dossier/type"

export function FoldersTable() {
  const { data, isLoading } = useDossiers()

  const columns = useMemo<ColumnDef<Dossier>[]>(
    () => [
      {
        accessorKey: "number",
        header: "Référence",
      },
      {
        accessorKey: "title",
        header: "Intitulé",
        cell: ({ row }) => (
          <span className="flex items-center gap-2 text-[#2f2f2f]">
            <FolderIcon />
            {row.original.title}
          </span>
        ),
      },
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
        id: "confidentiality",
        header: "Confidentialité",
        cell: ({ row }) => (
          <span className="flex items-center gap-2 text-[#2f2f2f]">
            {row.original.confidentiality === "PUBLIC" ? (
              <Eye className="size-5 text-[#52525b]" />
            ) : (
              <Lock className="size-5 text-[#52525b]" />
            )}
            {row.original.confidentiality === "PUBLIC" ? "Public" : "Restreint"}
          </span>
        ),
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
        cell: ({ row }) => <FolderRowActions folder={row.original} />,
      },
    ],
    []
  )

  return (
    <DataTable
      columns={columns}
      data={data?.data ?? []}
      isLoading={isLoading}
      emptyMessage="Aucun dossier"
    />
  )
}
