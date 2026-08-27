"use client"

import { useMemo } from "react"
import Link from "next/link"
import { FileText, Inbox, Send } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/shared/data-table"
import { CourrierStatusBadge } from "@/components/shared/courrier-status-badge"
import { DocumentRowActions } from "@/components/shared/document-row-actions"
import { MailRowActions } from "@/components/courriers/mail-row-actions"
import { OutgoingMailRowActions } from "@/components/courriers-sortants/outgoing-mail-row-actions"
import { useCourriers } from "@/hooks/courrier/useCourrier"
import { useDocuments } from "@/hooks/document/useDocument"
import type { Courrier } from "@/hooks/courrier/type"
import type { DocumentItem } from "@/hooks/document/type"

type ContentRow =
  | { kind: "courrier"; courrier: Courrier; reference: string; title: string; date: string; href: string }
  | { kind: "document"; document: DocumentItem; reference: string; title: string; date: string; href: string }

export function DossierContentsTable({ dossierId }: { dossierId: string }) {
  const { data: courriers, isLoading: loadingCourriers } = useCourriers({
    dossierId,
    take: 100,
  })
  const { data: documents, isLoading: loadingDocuments } = useDocuments({
    dossierId,
  })

  const rows = useMemo<ContentRow[]>(() => {
    const courrierRows: ContentRow[] = (courriers?.data ?? []).map((courrier) => ({
      kind: "courrier",
      courrier,
      reference: courrier.number,
      title: courrier.subject,
      date: courrier.createdAt,
      href:
        courrier.direction === "ENTRANT"
          ? `/courriers/entrants/${courrier.id}`
          : `/courriers/sortants/${courrier.id}`,
    }))
    const documentRows: ContentRow[] = (documents ?? []).map((document) => ({
      kind: "document",
      document,
      reference: document.originalName,
      title: document.originalName,
      date: document.createdAt,
      href: `/documents/${document.id}`,
    }))
    return [...courrierRows, ...documentRows].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }, [courriers, documents])

  const columns = useMemo<ColumnDef<ContentRow>[]>(
    () => [
      {
        id: "type",
        header: "Type",
        cell: ({ row }) => {
          const item = row.original
          if (item.kind === "document") {
            return (
              <span className="flex items-center gap-2 text-[#2f2f2f]">
                <FileText className="size-4 text-[#52525b]" /> Document
              </span>
            )
          }
          const isEntrant = item.courrier.direction === "ENTRANT"
          const Icon = isEntrant ? Inbox : Send
          return (
            <span className="flex items-center gap-2 text-[#2f2f2f]">
              <Icon className="size-4 text-[#52525b]" />
              {isEntrant ? "Courrier entrant" : "Courrier sortant"}
            </span>
          )
        },
      },
      { accessorKey: "reference", header: "Référence" },
      {
        id: "title",
        header: "Titre",
        cell: ({ row }) => (
          <Link href={row.original.href} className="hover:underline">
            {row.original.title}
          </Link>
        ),
      },
      {
        id: "status",
        header: "Statut",
        cell: ({ row }) =>
          row.original.kind === "courrier" ? (
            <CourrierStatusBadge status={row.original.courrier.status} />
          ) : (
            "—"
          ),
      },
      {
        id: "date",
        header: "Date",
        cell: ({ row }) =>
          new Date(row.original.date).toLocaleDateString("fr-FR"),
      },
      {
        id: "actions",
        header: "Actions",
        meta: { align: "right" },
        cell: ({ row }) => {
          const item = row.original
          if (item.kind === "document") {
            return <DocumentRowActions document={item.document} />
          }
          return item.courrier.direction === "ENTRANT" ? (
            <MailRowActions mail={item.courrier} />
          ) : (
            <OutgoingMailRowActions mail={item.courrier} />
          )
        },
      },
    ],
    []
  )

  return (
    <DataTable
      columns={columns}
      data={rows}
      isLoading={loadingCourriers || loadingDocuments}
      emptyMessage="Ce dossier ne contient encore aucun courrier ni document"
    />
  )
}
