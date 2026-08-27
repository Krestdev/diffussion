"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { FileText, Inbox, Send } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/shared/data-table"
import { FilterTabs } from "@/components/shared/filter-tabs"
import { ListPagination } from "@/components/shared/list-pagination"
import { ListToolbar } from "@/components/shared/list-toolbar"
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

type Tab = "all" | "entrant" | "sortant" | "document"

const PAGE_SIZE = 10

export function DossierContentsTable({ dossierId }: { dossierId: string }) {
  const { data: courriers, isLoading: loadingCourriers } = useCourriers({
    dossierId,
    take: 100,
  })
  const { data: documents, isLoading: loadingDocuments } = useDocuments({
    dossierId,
  })

  const [tab, setTab] = useState<Tab>("all")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

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

  const counts = useMemo(
    () => ({
      all: rows.length,
      entrant: rows.filter((r) => r.kind === "courrier" && r.courrier.direction === "ENTRANT").length,
      sortant: rows.filter((r) => r.kind === "courrier" && r.courrier.direction === "SORTANT").length,
      document: rows.filter((r) => r.kind === "document").length,
    }),
    [rows]
  )

  const byTab = useMemo(() => {
    if (tab === "all") return rows
    if (tab === "document") return rows.filter((r) => r.kind === "document")
    return rows.filter(
      (r) => r.kind === "courrier" && r.courrier.direction.toLowerCase() === tab
    )
  }, [rows, tab])

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return byTab
    return byTab.filter(
      (r) =>
        r.title.toLowerCase().includes(query) ||
        r.reference.toLowerCase().includes(query)
    )
  }, [byTab, search])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount)
  const pageRows = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  )

  function handleTabChange(next: Tab) {
    setTab(next)
    setPage(1)
  }

  function handleSearchChange(next: string) {
    setSearch(next)
    setPage(1)
  }

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
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <FilterTabs
          value={tab}
          onChange={handleTabChange}
          tabs={[
            { value: "all", label: "Tous", count: counts.all },
            { value: "entrant", label: "Entrants", count: counts.entrant },
            { value: "sortant", label: "Sortants", count: counts.sortant },
            { value: "document", label: "Documents", count: counts.document },
          ]}
        />
      </div>
      <ListToolbar
        showFilters={false}
        searchValue={search}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Rechercher par titre ou référence"
      />
      <DataTable
        columns={columns}
        data={pageRows}
        isLoading={loadingCourriers || loadingDocuments}
        emptyMessage={
          rows.length === 0
            ? "Ce dossier ne contient encore aucun courrier ni document"
            : "Aucun résultat pour ces filtres"
        }
      />
      <ListPagination
        total={filtered.length}
        page={safePage}
        pageCount={pageCount}
        onPageChange={setPage}
      />
    </div>
  )
}
