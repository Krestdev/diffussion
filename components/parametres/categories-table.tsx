"use client"

import { useMemo } from "react"
import type { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/shared/data-table"
import { CategoryRowActions } from "@/components/parametres/category-row-actions"
import { useCategories } from "@/hooks/category/useCategory"
import type { Category } from "@/hooks/category/type"

export function CategoriesTable() {
  const { data, isLoading } = useCategories()

  const columns = useMemo<ColumnDef<Category>[]>(
    () => [
      {
        id: "code",
        header: "Référence",
        cell: ({ row }) => row.original.code ?? "—",
      },
      { accessorKey: "label", header: "Libellé" },
      {
        id: "description",
        header: "Description",
        cell: ({ row }) => row.original.description ?? "—",
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
        cell: ({ row }) => <CategoryRowActions category={row.original} />,
      },
    ],
    []
  )

  return (
    <DataTable
      columns={columns}
      data={data ?? []}
      isLoading={isLoading}
      emptyMessage="Aucune catégorie"
    />
  )
}
