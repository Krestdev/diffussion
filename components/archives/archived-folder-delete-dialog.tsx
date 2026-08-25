"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import type { ArchivedFolder } from "@/components/archives/types"

export function ArchivedFolderDeleteDialog({
  folder,
  open,
  onOpenChange,
}: {
  folder: ArchivedFolder
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [confirmation, setConfirmation] = useState("")
  const canDelete = confirmation.trim() === folder.title

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) setConfirmation("")
        onOpenChange(next)
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="max-w-[460px] gap-0 rounded-2xl p-4"
      >
        <DialogGradientHeader
          title={folder.title}
          subtitle="Suppression de dossier"
          variant="destructive"
        />
        <div className="flex flex-col gap-3 py-3">
          <p className="text-sm text-[#2f2f2f]">
            Êtes-vous sûr de vouloir{" "}
            <span className="font-bold">supprimer</span> ce dossier ? Cette
            action est irréversible.
          </p>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#18181b]">
              Pour confirmer entrez « {folder.title} »{" "}
              <span className="text-[#dc2626]">*</span>
            </label>
            <Input
              required
              value={confirmation}
              onChange={(event) => setConfirmation(event.target.value)}
              placeholder="Nom du dossier"
              className="h-9 rounded border border-[#e4e4e7] px-4"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={!canDelete}
            className="bg-destructive text-sm font-medium tracking-normal text-white normal-case hover:bg-destructive/90"
            onClick={() => onOpenChange(false)}
          >
            Oui, supprimer
          </Button>
          <Button
            variant="outline"
            className="text-sm font-medium tracking-normal normal-case"
            onClick={() => onOpenChange(false)}
          >
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
