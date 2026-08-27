"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import { getApiErrorMessage } from "@/lib/apiError"
import {
  useCreateCategory,
  useUpdateCategory,
} from "@/hooks/category/useCategory"
import type { Category } from "@/hooks/category/type"

export function CategoryFormDialog({
  category,
  open,
  onOpenChange,
}: {
  category?: Category
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [label, setLabel] = useState(category?.label ?? "")
  const [code, setCode] = useState(category?.code ?? "")
  const [description, setDescription] = useState(category?.description ?? "")
  const [retentionMonths, setRetentionMonths] = useState(
    category?.retentionMonths?.toString() ?? ""
  )

  const createCategory = useCreateCategory()
  const updateCategory = useUpdateCategory()
  const isPending = createCategory.isPending || updateCategory.isPending

  function handleOpenChange(next: boolean) {
    if (next) {
      setLabel(category?.label ?? "")
      setCode(category?.code ?? "")
      setDescription(category?.description ?? "")
      setRetentionMonths(category?.retentionMonths?.toString() ?? "")
    }
    onOpenChange(next)
  }

  function handleSubmit() {
    const body = {
      label,
      code: code || undefined,
      description: description || undefined,
      retentionMonths: retentionMonths ? Number(retentionMonths) : undefined,
    }
    const onSuccess = () => {
      toast.add({
        title: category ? "Catégorie modifiée" : "Catégorie créée",
        type: "success",
      })
      onOpenChange(false)
    }
    const onError = (error: unknown) =>
      toast.add({
        title: "Échec de l’enregistrement",
        description: getApiErrorMessage(error, "Veuillez réessayer."),
        type: "error",
      })

    if (category) {
      updateCategory.mutate({ id: category.id, body }, { onSuccess, onError })
    } else {
      createCategory.mutate(body, { onSuccess, onError })
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[500px] gap-0 rounded-2xl p-4"
      >
        <DialogGradientHeader
          title={category ? `Modifier : ${category.label}` : "Nouvelle catégorie"}
          subtitle="Catégorie de documents"
          variant="secondary"
        />
        <div className="flex flex-col gap-3 py-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#18181b]">
              Libellé <span className="text-[#dc2626]">*</span>
            </label>
            <Input
              required
              value={label}
              onChange={(event) => setLabel(event.target.value)}
              placeholder="ex. Légal"
              className="h-10 rounded border border-[#e4e4e7] px-3"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#18181b]">Code</label>
            <Input
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="ex. CD-970"
              className="h-10 rounded border border-[#e4e4e7] px-3"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#18181b]">
              Description
            </label>
            <Textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="min-h-[60px] rounded border border-[#e4e4e7] px-3 py-2"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#18181b]">
              Durée de conservation (mois)
            </label>
            <Input
              type="number"
              min={0}
              value={retentionMonths}
              onChange={(event) => setRetentionMonths(event.target.value)}
              placeholder="ex. 60"
              className="h-10 rounded border border-[#e4e4e7] px-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            className="bg-[#0f5499] text-sm font-medium tracking-normal text-white normal-case hover:bg-[#0f5499]/90"
            disabled={isPending || !label.trim()}
            onClick={handleSubmit}
          >
            {category ? "Enregistrer" : "Créer"}
          </Button>
          <Button
            variant="outline"
            className="text-sm font-medium tracking-normal normal-case"
            onClick={() => onOpenChange(false)}
          >
            Annuler
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
