"use client"

import { useState } from "react"
import { Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/toast"
import { getApiErrorMessage } from "@/lib/apiError"
import { useRoles } from "@/hooks/role/useRole"
import {
  useCircuitSteps,
  useCreateCircuitStep,
  useDeleteCircuitStep,
  useUpdateCircuitStep,
} from "@/hooks/circuitStep/useCircuitStep"
import type { CircuitStep } from "@/hooks/circuit/type"

type Draft = {
  order: string
  actionType: string
  roleId: string
  maxDelayHours: string
  condition: string
  parentStepId: string
}

const emptyDraft = (nextOrder: number): Draft => ({
  order: String(nextOrder),
  actionType: "",
  roleId: "",
  maxDelayHours: "",
  condition: "",
  parentStepId: "",
})

// The ordered step list + add/edit mini-form for one circuit — used both
// inline on the Circuit detail page and inside CircuitStepsDialog (the
// quick-access version opened from the circuits list row actions).
export function CircuitStepsManager({ circuitId }: { circuitId: string }) {
  const { data: steps, isLoading } = useCircuitSteps(circuitId)
  const { data: roles } = useRoles()

  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<Draft>(emptyDraft(1))

  const createStep = useCreateCircuitStep()
  const updateStep = useUpdateCircuitStep()
  const deleteStep = useDeleteCircuitStep()
  const isPending =
    createStep.isPending || updateStep.isPending || deleteStep.isPending

  function resetDraft() {
    setEditingId(null)
    setDraft(emptyDraft((steps?.length ?? 0) + 1))
  }

  function startEdit(step: CircuitStep) {
    setEditingId(step.id)
    setDraft({
      order: String(step.order),
      actionType: step.actionType ?? "",
      roleId: step.roleId ?? "",
      maxDelayHours: step.maxDelayHours?.toString() ?? "",
      condition: step.condition ?? "",
      parentStepId: step.parentStepId ?? "",
    })
  }

  function handleSave() {
    const body = {
      order: Number(draft.order),
      actionType: draft.actionType || undefined,
      roleId: draft.roleId || undefined,
      maxDelayHours: draft.maxDelayHours ? Number(draft.maxDelayHours) : undefined,
      condition: draft.condition || undefined,
      parentStepId: draft.parentStepId || undefined,
    }
    const onSuccess = () => {
      toast.add({
        title: editingId ? "Étape modifiée" : "Étape ajoutée",
        type: "success",
      })
      resetDraft()
    }
    const onError = (error: unknown) =>
      toast.add({
        title: "Échec de l’enregistrement",
        description: getApiErrorMessage(error, "Veuillez réessayer."),
        type: "error",
      })

    if (editingId) {
      updateStep.mutate({ id: editingId, body }, { onSuccess, onError })
    } else {
      createStep.mutate({ circuitId, ...body }, { onSuccess, onError })
    }
  }

  function handleDelete(step: CircuitStep) {
    deleteStep.mutate(step.id, {
      onSuccess: () => {
        toast.add({ title: "Étape supprimée", type: "success" })
        if (editingId === step.id) resetDraft()
      },
      onError: (error) =>
        toast.add({
          title: "Échec de la suppression",
          description: getApiErrorMessage(error, "Veuillez réessayer."),
          type: "error",
        }),
    })
  }

  return (
    <div className="flex flex-col gap-3">
      {isLoading ? (
        <p className="text-sm text-[#71717a]">Chargement…</p>
      ) : steps && steps.length > 0 ? (
        <ul className="flex flex-col gap-1.5">
          {steps
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((step) => (
              <li
                key={step.id}
                className="flex items-center justify-between gap-2 rounded border border-[#e4e4e7] px-3 py-2 text-sm text-[#2f2f2f]"
              >
                <div className="flex flex-col">
                  <span className="font-medium">
                    {step.order}. {step.actionType ?? "Étape"}
                    {step.role ? ` — ${step.role.name}` : ""}
                  </span>
                  <span className="text-xs text-[#71717a]">
                    {step.maxDelayHours
                      ? `Délai max ${step.maxDelayHours}h`
                      : "Aucun délai max"}
                    {step.condition ? ` · Condition : ${step.condition}` : ""}
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => startEdit(step)}
                    className="text-[#71717a] hover:text-[#2f2f2f]"
                  >
                    <Pencil className="size-4" />
                    <span className="sr-only">Modifier</span>
                  </button>
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => handleDelete(step)}
                    className="text-[#71717a] hover:text-[#dc2626]"
                  >
                    <Trash2 className="size-4" />
                    <span className="sr-only">Supprimer</span>
                  </button>
                </div>
              </li>
            ))}
        </ul>
      ) : (
        <p className="text-sm text-[#71717a]">Aucune étape</p>
      )}

      <div className="grid grid-cols-2 gap-3 rounded-md border border-[#dfdfdf] p-3">
        <p className="col-span-2 text-sm font-medium text-black">
          {editingId ? "Modifier l’étape" : "Ajouter une étape"}
        </p>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#18181b]">
            Position <span className="text-[#dc2626]">*</span>
          </label>
          <Input
            type="number"
            min={1}
            value={draft.order}
            onChange={(event) =>
              setDraft((d) => ({ ...d, order: event.target.value }))
            }
            className="h-9 rounded border border-[#e4e4e7] px-3"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#18181b]">
            Type d’action
          </label>
          <Input
            value={draft.actionType}
            onChange={(event) =>
              setDraft((d) => ({ ...d, actionType: event.target.value }))
            }
            placeholder="ex. VERIFICATION"
            className="h-9 rounded border border-[#e4e4e7] px-3"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#18181b]">
            Rôle requis
          </label>
          <Select
            value={draft.roleId}
            onValueChange={(value) =>
              setDraft((d) => ({ ...d, roleId: value ?? "" }))
            }
          >
            <SelectTrigger className="h-9 w-full rounded border border-[#e4e4e7] px-4">
              <SelectValue placeholder="Sélectionner (facultatif)" />
            </SelectTrigger>
            <SelectContent>
              {roles?.map((role) => (
                <SelectItem key={role.id} value={role.id}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#18181b]">
            Délai max (heures)
          </label>
          <Input
            type="number"
            min={1}
            value={draft.maxDelayHours}
            onChange={(event) =>
              setDraft((d) => ({ ...d, maxDelayHours: event.target.value }))
            }
            placeholder="ex. 48"
            className="h-9 rounded border border-[#e4e4e7] px-3"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#18181b]">
            Étape de repli si rejet
          </label>
          <Select
            value={draft.parentStepId}
            onValueChange={(value) =>
              setDraft((d) => ({ ...d, parentStepId: value ?? "" }))
            }
          >
            <SelectTrigger className="h-9 w-full rounded border border-[#e4e4e7] px-4">
              <SelectValue placeholder="Aucune" />
            </SelectTrigger>
            <SelectContent>
              {steps
                ?.filter((step) => step.id !== editingId)
                .map((step) => (
                  <SelectItem key={step.id} value={step.id}>
                    {step.order}. {step.actionType ?? "Étape"}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#18181b]">
            Condition
          </label>
          <Input
            value={draft.condition}
            onChange={(event) =>
              setDraft((d) => ({ ...d, condition: event.target.value }))
            }
            placeholder="ex. montant > 1 000 000"
            className="h-9 rounded border border-[#e4e4e7] px-3"
          />
        </div>
        <div className="col-span-2 flex justify-end gap-2">
          {editingId && (
            <Button
              type="button"
              variant="outline"
              className="text-sm font-medium tracking-normal normal-case"
              onClick={resetDraft}
            >
              Annuler la modification
            </Button>
          )}
          <Button
            type="button"
            disabled={isPending || !draft.order}
            className="bg-[#0f5499] text-sm font-medium tracking-normal text-white normal-case hover:bg-[#0f5499]/90"
            onClick={handleSave}
          >
            {editingId ? "Enregistrer l’étape" : "Ajouter l’étape"}
          </Button>
        </div>
      </div>
    </div>
  )
}
