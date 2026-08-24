"use client"

import { Upload, X } from "lucide-react"

import type { FolderFile } from "@/components/dossiers/types"

export function FolderDocumentsField({
  files,
  onRemove,
}: {
  files: FolderFile[]
  onRemove: (name: string) => void
}) {
  return (
    <div className="flex flex-col gap-2 md:col-span-2">
      <p className="text-sm font-medium text-[#18181b]">Documents</p>
      <label className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded border border-dashed border-[#e4e4e7] px-4 py-2">
        <input type="file" multiple className="sr-only" />
        <span className="flex size-10 items-center justify-center rounded-full border border-[#f4f4f5]">
          <Upload className="size-4" />
        </span>
        <p className="text-sm font-medium text-[#18181b]">
          Télécharger des fichiers
        </p>
        <p className="text-[10px] text-[#a1a1aa]">
          Glisser-déposer ou parcourir (max. 2 Mo)
        </p>
      </label>
      {files.length > 0 && (
        <ul className="flex flex-col gap-2.5">
          {files.map((file) => (
            <li
              key={file.name}
              className="flex items-start gap-2 rounded-lg border border-[#f4f4f5] p-2"
            >
              <div className="size-10 shrink-0 rounded bg-[#f4f4f5]" />
              <div className="flex-1">
                <p className="text-sm text-[#2f2f2f]">{file.name}</p>
                <p className="text-xs text-[#a1a1aa]">{file.size}</p>
              </div>
              <button
                type="button"
                onClick={() => onRemove(file.name)}
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
