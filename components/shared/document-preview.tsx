"use client"

import { FileX } from "lucide-react"

import { useDocumentPreviewUrl } from "@/hooks/document/useDocument"

function isImage(mimeType: string | null) {
  return mimeType?.startsWith("image/") ?? false
}

// PDFs and text render fine in a plain <iframe> — no viewer library needed.
function isInlineViewable(mimeType: string | null) {
  return mimeType === "application/pdf" || (mimeType?.startsWith("text/") ?? false)
}

/**
 * Inline preview of an uploaded file, fetched via a fresh signed URL (see
 * useDocumentPreviewUrl) — images render directly, PDFs/text render in an
 * iframe, anything else falls back to "no preview available" since the
 * browser has no built-in way to display it.
 */
export function DocumentPreview({
  documentId,
  mimeType,
  originalName,
}: {
  documentId: string
  mimeType: string | null
  originalName: string
}) {
  const { data, isLoading, isError } = useDocumentPreviewUrl(documentId)

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-[#dfdfdf] p-4">
      <p className="text-base font-semibold text-[#18181b]">Aperçu</p>

      {isLoading ? (
        <p className="text-sm text-[#71717a]">Chargement…</p>
      ) : isError || !data ? (
        <p className="text-sm text-[#71717a]">
          Impossible de charger l&apos;aperçu pour le moment.
        </p>
      ) : isImage(mimeType) ? (
        // Signed URL on an external S3-compatible host, not a static local asset.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={data.url}
          alt={originalName}
          className="max-h-150 w-full rounded-lg border border-[#e4e4e7] object-contain"
        />
      ) : isInlineViewable(mimeType) ? (
        <iframe
          src={data.url}
          title={originalName}
          className="h-150 w-full rounded-lg border border-[#e4e4e7]"
        />
      ) : (
        <div className="flex flex-col items-center gap-2 py-8 text-center">
          <FileX className="size-8 text-[#a1a1aa]" />
          <p className="text-sm text-[#71717a]">
            Aperçu non disponible pour ce type de fichier
            {mimeType ? ` (${mimeType})` : ""}.
          </p>
        </div>
      )}
    </div>
  )
}
