"use client"

import { useMemo } from "react"
import type { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/shared/data-table"
import { ActivityLevelBadge } from "@/components/audit/activity-level-badge"
import { AuditRowActions } from "@/components/audit/audit-row-actions"
import { useActivityLogs } from "@/hooks/activity/useActivity"
import type { ActivityLog } from "@/hooks/activity/type"

export function AuditTable() {
  const { data, isLoading } = useActivityLogs({ take: 100 })

  const columns = useMemo<ColumnDef<ActivityLog>[]>(
    () => [
      {
        id: "reference",
        header: "Référence",
        cell: ({ row }) => (
          <span className="font-mono text-xs">
            {row.original.id.slice(0, 8)}
          </span>
        ),
      },
      { accessorKey: "action", header: "Action" },
      {
        id: "user",
        header: "Utilisateur",
        cell: ({ row }) => row.original.actorLabel ?? "Système",
      },
      {
        id: "entityType",
        header: "Type d’objet",
        cell: ({ row }) => row.original.entityType ?? "—",
      },
      {
        id: "objectReference",
        header: "Référence de l’objet",
        cell: ({ row }) =>
          row.original.entityId ? (
            <span className="font-mono text-xs">
              {row.original.entityId.slice(0, 8)}
            </span>
          ) : (
            "—"
          ),
      },
      {
        id: "level",
        header: "Niveau",
        cell: ({ row }) => <ActivityLevelBadge level={row.original.level} />,
      },
      {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) =>
          new Date(row.original.createdAt).toLocaleString("fr-FR"),
      },
      {
        id: "actions",
        header: "Actions",
        meta: { align: "right" },
        cell: ({ row }) => <AuditRowActions log={row.original} />,
      },
    ],
    []
  )

  return (
    <DataTable
      columns={columns}
      data={data?.data ?? []}
      isLoading={isLoading}
      emptyMessage="Aucune entrée d’audit"
    />
  )
}
