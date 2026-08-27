"use client"

import { useId } from "react"
import { ArrowBigLeft, Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} o`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`
  return `${(bytes / (1024 * 1024)).toFixed(2)} Mo`
}

export function MailDocumentsStep({
  files,
  onFilesAdded,
  onRemove,
  onPrevious,
  onSubmit,
  submitLabel = "Enregistrer",
  isPending,
}: {
  files: File[]
  onFilesAdded: (files: File[]) => void
  onRemove: (file: File) => void
  onPrevious?: () => void
  onSubmit: () => void
  submitLabel?: string
  isPending?: boolean
}) {
  const inputId = useId()

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-base font-semibold text-black">Documents</p>
        <div className="flex flex-col gap-3 rounded-md border border-[#dfdfdf] p-3">
          <label
            htmlFor={inputId}
            className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded border border-dashed border-[#e4e4e7] px-4 py-4"
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
      </div>

      <div className="flex gap-2">
        {onPrevious && (
          <Button
            type="button"
            variant="outline"
            className="h-11 rounded-lg px-5 text-base font-medium tracking-normal normal-case"
            onClick={onPrevious}
          >
            <ArrowBigLeft className="size-5" />
            Précédent
          </Button>
        )}
        <Button
          type="submit"
          disabled={isPending}
          className="h-11 rounded-lg bg-[#700032] px-5 text-base font-medium tracking-normal text-white normal-case hover:bg-[#700032]/90"
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
