"use client"

import { useMemo } from "react"
import Link from "next/link"
import type { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/shared/data-table"
import { CourrierStatusBadge } from "@/components/shared/courrier-status-badge"
import type { Courrier, CourrierDirection } from "@/hooks/courrier/type"

// Shared by the "Enregistrements" (combined register, both directions) and
// "Affectations" (courriers owned by me) pages — neither is scoped to one
// direction the way MailsTable/OutgoingMailsTable are, so both need the
// direction shown per row and a "Voir" link resolved accordingly. Also used
// for the "Répond à" link, which only carries a {id, direction} summary.
function courrierHref(target: { id: string; direction: CourrierDirection }) {
  return target.direction === "SORTANT"
    ? `/courriers/sortants/${target.id}`
    : `/courriers/entrants/${target.id}`
}

export function MailRegisterTable({
  courriers,
  isLoading,
  emptyMessage = "Aucun courrier",
}: {
  courriers: Courrier[]
  isLoading?: boolean
  emptyMessage?: string
}) {
  const columns = useMemo<ColumnDef<Courrier>[]>(
    () => [
      { accessorKey: "number", header: "Référence" },
      {
        id: "direction",
        header: "Sens",
        cell: ({ row }) =>
          row.original.direction === "SORTANT" ? "Sortant" : "Entrant",
      },
      { accessorKey: "subject", header: "Objet" },
      {
        id: "correspondent",
        header: "Correspondant",
        cell: ({ row }) => row.original.correspondent?.name ?? "—",
      },
      {
        id: "dossier",
        header: "Dossier",
        cell: ({ row }) => row.original.dossier.title,
      },
      {
        id: "respondsTo",
        header: "Répond à",
        cell: ({ row }) =>
          row.original.respondsTo ? (
            <Link
              href={courrierHref(row.original.respondsTo)}
              className="text-[#700032] hover:underline"
            >
              {row.original.respondsTo.number}
            </Link>
          ) : (
            "—"
          ),
      },
      {
        id: "status",
        header: "Statut",
        cell: ({ row }) => <CourrierStatusBadge status={row.original.status} />,
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
        cell: ({ row }) => (
          <Link
            href={courrierHref(row.original)}
            className="text-sm font-medium text-[#700032] hover:underline"
          >
            Voir
          </Link>
        ),
      },
    ],
    []
  )

  return (
    <DataTable
      columns={columns}
      data={courriers}
      isLoading={isLoading}
      emptyMessage={emptyMessage}
    />
  )
}
