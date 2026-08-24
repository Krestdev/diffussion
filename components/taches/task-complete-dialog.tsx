"use client"

import { useState } from "react"
import { Check, Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import type { Task } from "@/components/taches/types"
import { cn } from "@/lib/utils"

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} o`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} ko`
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`
}

function DeliverableUpload({
  label,
  title,
  file,
  onChange,
}: {
  label: string
  title: string
  file: File | null
  onChange: (file: File | null) => void
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5">
        <label className="text-sm font-medium text-[#18181b]">
          {title} <span className="text-[#dc2626]">*</span>
        </label>
        {file && (
          <span className="flex size-5 items-center justify-center rounded-full bg-[#16a34a]">
            <Check className="size-4 text-white" />
          </span>
        )}
      </div>
      <label
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-1 rounded border border-dashed border-[#e4e4e7] px-4 py-2 text-center",
          file && "bg-[#f4f4f5]"
        )}
      >
        <input
          type="file"
          className="sr-only"
          aria-label={label}
          onChange={(event) => onChange(event.target.files?.[0] ?? null)}
        />
        <span className="flex size-10 items-center justify-center rounded-full border border-[#f4f4f5]">
          <Upload className="size-4" />
        </span>
        <span className="text-sm font-medium text-[#18181b]">
          Télécharger des fichiers
        </span>
        <span className="text-[10px] text-[#a1a1aa]">
          Glisser-déposer ou parcourir (max. 2 Mo)
        </span>
      </label>
      {file && (
        <div className="flex items-start gap-2 rounded-lg border border-[#f4f4f5] p-2">
          <div className="size-10 shrink-0 rounded bg-[#f4f4f5]" />
          <div className="flex-1">
            <p className="text-sm text-[#2f2f2f]">{file.name}</p>
            <p className="text-xs text-[#a1a1aa]">
              {formatFileSize(file.size)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label={`Retirer ${file.name}`}
          >
            <X className="size-4 text-[#71717a]" />
          </button>
        </div>
      )}
    </div>
  )
}

export function TaskCompleteDialog({
  task,
  open,
  onOpenChange,
}: {
  task: Task
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [files, setFiles] = useState<Record<string, File | null>>({})

  function handleSubmit() {
    setFiles({})
    onOpenChange(false)
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) setFiles({})
    onOpenChange(nextOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[760px] gap-0 rounded-2xl p-4"
      >
        <DialogGradientHeader
          title={task.title}
          subtitle="Complétion de tâche"
          variant="secondary"
        />
        <div className="flex flex-col gap-4 py-3">
          {task.deliverables.map((deliverable) => (
            <DeliverableUpload
              key={deliverable.label}
              label={deliverable.label}
              title={deliverable.title}
              file={files[deliverable.label] ?? null}
              onChange={(file) =>
                setFiles((current) => ({
                  ...current,
                  [deliverable.label]: file,
                }))
              }
            />
          ))}
        </div>
        <DialogFooter>
          <Button
            className="bg-[#700032] text-sm font-medium tracking-normal text-white normal-case hover:bg-[#700032]/90"
            onClick={handleSubmit}
          >
            Soumettre
          </Button>
          <Button
            variant="outline"
            className="text-sm font-medium tracking-normal normal-case"
            onClick={() => handleOpenChange(false)}
          >
            Annuler
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
