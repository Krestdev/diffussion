"use client"

import { useMemo } from "react"
import type { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/shared/data-table"
import { UserRowActions } from "@/components/utilisateurs/user-row-actions"
import { useAdminUsers } from "@/hooks/adminUser/useAdminUser"
import type { AppUser } from "@/hooks/adminUser/type"

export function UtilisateursTable() {
  const { data, isLoading } = useAdminUsers()

  const columns = useMemo<ColumnDef<AppUser>[]>(
    () => [
      {
        id: "reference",
        header: "Référence",
        cell: ({ row }) => row.original.registrationNumber ?? "—",
      },
      {
        accessorKey: "name",
        header: "Nom & prénoms",
      },
      {
        accessorKey: "email",
        header: "Adresse mail",
      },
      {
        id: "function",
        header: "Fonction",
        cell: ({ row }) => row.original.function ?? "—",
      },
      {
        id: "sites",
        header: "Site",
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-1">
            {row.original.sites.map((site) => (
              <span
                key={site.id}
                className="inline-flex h-[22px] items-center rounded-md border border-[#e4e4e7] bg-[#f4f4f5] px-2 py-0.5 text-sm font-medium text-[#52525b]"
              >
                {site.name}
              </span>
            ))}
          </div>
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
        cell: ({ row }) => <UserRowActions user={row.original} />,
      },
    ],
    []
  )

  return (
    <DataTable
      columns={columns}
      data={data ?? []}
      isLoading={isLoading}
      emptyMessage="Aucun utilisateur"
    />
  )
}
