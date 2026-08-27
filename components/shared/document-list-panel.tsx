"use client"

import Link from "next/link"
import { Download, Eye, FileX, Paperclip, Trash2 } from "lucide-react"

import { toast } from "@/components/ui/toast"
import {
  useDeleteDocument,
  useDocumentDownloadUrl,
  useDocuments,
} from "@/hooks/document/useDocument"
import type { FindDocumentsParams } from "@/hooks/document/type"

function formatSize(bytes: number | null) {
  if (!bytes) return ""
  if (bytes < 1024) return `${bytes} o`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`
  return `${(bytes / (1024 * 1024)).toFixed(2)} Mo`
}

/** Inline (non-dialog) documents list — embeddable on any detail page.
 * Pass exactly one of dossierId/courrierId/livrableId. */
export function DocumentListPanel({
  title = "Documents",
  ...params
}: FindDocumentsParams & { title?: string }) {
  const { data: documents, isLoading } = useDocuments(params)
  const deleteDocument = useDeleteDocument()
  const getDownloadUrl = useDocumentDownloadUrl()

  function handleDownload(id: string) {
    getDownloadUrl.mutate(id, {
      onSuccess: ({ url }) => window.open(url, "_blank", "noopener"),
      onError: () =>
        toast.add({ title: "Échec du téléchargement", type: "error" }),
    })
  }

  function handleDelete(id: string) {
    deleteDocument.mutate(id, {
      onError: () =>
        toast.add({ title: "Échec de la suppression", type: "error" }),
    })
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-[#dfdfdf] p-4">
      <div className="flex items-center gap-2">
        <Paperclip className="size-5 text-[#52525b]" />
        <p className="text-base font-semibold text-[#18181b]">{title}</p>
      </div>
      {isLoading && <p className="text-sm text-[#71717a]">Chargement…</p>}
      {!isLoading && documents?.length === 0 && (
        <div className="flex flex-col items-center gap-2 py-4 text-center">
          <FileX className="size-8 text-[#a1a1aa]" />
          <p className="text-sm text-[#71717a]">Aucun document disponible</p>
        </div>
      )}
      {documents && documents.length > 0 && (
        <ul className="flex flex-col gap-2">
          {documents.map((document) => (
            <li
              key={document.id}
              className="flex items-center gap-2 rounded-lg border border-[#f4f4f5] p-2"
            >
              <Link
                href={`/documents/${document.id}`}
                className="min-w-0 flex-1 hover:underline"
              >
                <p className="truncate text-sm text-[#2f2f2f]">
                  {document.originalName}
                </p>
                <p className="text-xs text-[#a1a1aa]">
                  {formatSize(document.sizeBytes)}
                </p>
              </Link>
              <Link
                href={`/documents/${document.id}`}
                aria-label={`Aperçu de ${document.originalName}`}
              >
                <Eye className="size-4 text-muted-foreground" />
              </Link>
              <button
                type="button"
                onClick={() => handleDownload(document.id)}
                aria-label={`Télécharger ${document.originalName}`}
              >
                <Download className="size-4 text-muted-foreground" />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(document.id)}
                aria-label={`Supprimer ${document.originalName}`}
              >
                <Trash2 className="size-4 text-destructive" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
