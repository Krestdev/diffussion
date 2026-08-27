"use client"

import { useId } from "react"
import { Upload, X } from "lucide-react"

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} o`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`
  return `${(bytes / (1024 * 1024)).toFixed(2)} Mo`
}

/** Presentational, form-less file picker + pending-list — embed inside any
 * surrounding <form>. Selected files stay local until the caller uploads
 * them (typically after the parent resource is created/updated). */
export function DocumentUploadField({
  files,
  onFilesAdded,
  onRemove,
  label = "Documents",
}: {
  files: File[]
  onFilesAdded: (files: File[]) => void
  onRemove: (file: File) => void
  label?: string
}) {
  const inputId = useId()

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-[#18181b]">{label}</p>
      <label
        htmlFor={inputId}
        className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded border border-dashed border-[#e4e4e7] px-4 py-2"
      >
        <input
          id={inputId}
          type="file"
          multiple
          className="sr-only"
          onChange={(event) => {
            const selected = Array.from(event.target.files ?? [])
            if (selected.length > 0) onFilesAdded(selected)
            event.target.value = ""
          }}
        />
        <span className="flex size-10 items-center justify-center rounded-full border border-[#f4f4f5]">
          <Upload className="size-4" />
        </span>
        <p className="text-sm font-medium text-[#18181b]">
          Télécharger des fichiers
        </p>
        <p className="text-[10px] text-[#a1a1aa]">
          Glisser-déposer ou parcourir
        </p>
      </label>
      {files.length > 0 && (
        <ul className="flex flex-col gap-2.5">
          {files.map((file) => (
            <li
              key={`${file.name}-${file.lastModified}`}
              className="flex items-start gap-2 rounded-lg border border-[#f4f4f5] p-2"
            >
              <div className="size-10 shrink-0 rounded bg-[#f4f4f5]" />
              <div className="flex-1">
                <p className="text-sm text-[#2f2f2f]">{file.name}</p>
                <p className="text-xs text-[#a1a1aa]">
                  {formatSize(file.size)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onRemove(file)}
                aria-label={`Retirer ${file.name}`}
              >
                <X className="size-4 text-muted-foreground" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
