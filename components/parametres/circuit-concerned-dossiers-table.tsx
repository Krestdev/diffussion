"use client"

import { useMemo } from "react"
import Link from "next/link"
import type { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/shared/data-table"
import { FolderStatusBadge } from "@/components/dossiers/folder-status-badge"
import { useDossiers } from "@/hooks/dossier/useDossier"
import type { Dossier } from "@/hooks/dossier/type"

// A Circuit template only binds to a dossierType — a CircuitInstance (the
// runtime engine, see CircuitInstancePanel) attaches to one specific
// courrier or document, never to the dossier itself. So "concerned" here
// means: dossiers of the type this circuit applies to, and by extension
// everything filed under them, not the (possibly empty, possibly partial)
// set of courriers/documents that have actually started this circuit yet.
export function CircuitConcernedDossiersTable({
  dossierTypeId,
}: {
  dossierTypeId: string | null
}) {
  const { data, isLoading } = useDossiers(
    dossierTypeId ? { typeId: dossierTypeId, take: 100 } : undefined
  )

  const columns = useMemo<ColumnDef<Dossier>[]>(
    () => [
      { accessorKey: "number", header: "Référence" },
      {
        id: "title",
        header: "Intitulé",
        cell: ({ row }) => (
          <Link href={`/dossiers/${row.original.id}`} className="hover:underline">
            {row.original.title}
          </Link>
        ),
      },
      {
        id: "site",
        header: "Site",
        cell: ({ row }) => row.original.site.name,
      },
      {
        id: "courriers",
        header: "Courriers",
        cell: ({ row }) => row.original._count.courriers,
      },
      {
        id: "status",
        header: "Statut",
        cell: ({ row }) => <FolderStatusBadge status={row.original.status} />,
      },
    ],
    []
  )

  if (!dossierTypeId) {
    return (
      <p className="text-sm text-[#71717a]">
        Ce circuit n’est associé à aucun type de dossier — impossible de
        déterminer les dossiers, courriers et documents concernés.
      </p>
    )
  }

  return (
    <DataTable
      columns={columns}
      data={data?.data ?? []}
      isLoading={isLoading}
      emptyMessage="Aucun dossier de ce type pour le moment"
    />
  )
}
