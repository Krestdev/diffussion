"use client"

import { useMemo } from "react"
import type { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/shared/data-table"
import { RoleRowActions } from "@/components/roles/role-row-actions"
import { useRoles } from "@/hooks/role/useRole"
import type { Role } from "@/hooks/role/type"

export function RolesTable() {
  const { data, isLoading } = useRoles()

  const columns = useMemo<ColumnDef<Role>[]>(
    () => [
      {
        accessorKey: "code",
        header: "Référence",
      },
      {
        accessorKey: "name",
        header: "Nom",
      },
      {
        id: "permissions",
        header: "Permissions",
        cell: ({ row }) => row.original.permissions.length,
      },
      {
        accessorKey: "usersCount",
        header: "Utilisateurs",
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
        cell: ({ row }) => <RoleRowActions role={row.original} />,
      },
    ],
    []
  )

  return (
    <DataTable
      columns={columns}
      data={data ?? []}
      isLoading={isLoading}
      emptyMessage="Aucun rôle"
    />
  )
}
