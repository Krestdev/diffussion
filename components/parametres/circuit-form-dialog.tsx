"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/toast"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import { getApiErrorMessage } from "@/lib/apiError"
import { useCreateCircuit, useUpdateCircuit } from "@/hooks/circuit/useCircuit"
import { useDossierTypes } from "@/hooks/dossierType/useDossierType"
import { useRoles } from "@/hooks/role/useRole"
import type { Circuit } from "@/hooks/circuit/type"

// Create only sets dossierTypeId/roleId when a value is actually picked —
// UpdateCircuitDto's fields are optional UUIDs, not nullable, so an edit
// can change them to another value but can't clear one back to "aucun"
// from this form.
export function CircuitFormDialog({
  circuit,
  open,
  onOpenChange,
}: {
  circuit?: Circuit
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [name, setName] = useState(circuit?.name ?? "")
  const [dossierTypeId, setDossierTypeId] = useState(
    circuit?.dossierTypeId ?? ""
  )
  const [roleId, setRoleId] = useState(circuit?.roleId ?? "")

  const { data: dossierTypes } = useDossierTypes()
  const { data: roles } = useRoles()
  const createCircuit = useCreateCircuit()
  const updateCircuit = useUpdateCircuit()
  const isPending = createCircuit.isPending || updateCircuit.isPending

  function handleOpenChange(next: boolean) {
    if (next) {
      setName(circuit?.name ?? "")
      setDossierTypeId(circuit?.dossierTypeId ?? "")
      setRoleId(circuit?.roleId ?? "")
    }
    onOpenChange(next)
  }

  function handleSubmit() {
    const body = {
      name,
      dossierTypeId: dossierTypeId || undefined,
      roleId: roleId || undefined,
    }
    const onSuccess = () => {
      toast.add({
        title: circuit ? "Circuit modifié" : "Circuit créé",
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

    if (circuit) {
      updateCircuit.mutate({ id: circuit.id, body }, { onSuccess, onError })
    } else {
      createCircuit.mutate(body, { onSuccess, onError })
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[460px] gap-0 rounded-2xl p-4"
      >
        <DialogGradientHeader
          title={circuit ? `Modifier : ${circuit.name}` : "Nouveau circuit"}
          subtitle="Circuit de validation"
          variant="secondary"
        />
        <div className="flex flex-col gap-3 py-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#18181b]">
              Nom <span className="text-[#dc2626]">*</span>
            </label>
            <Input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="ex. Validation courrier sortant standard"
              className="h-10 rounded border border-[#e4e4e7] px-3"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#18181b]">
              Type de dossier
            </label>
            <Select
              value={dossierTypeId}
              onValueChange={(value) => setDossierTypeId(value ?? "")}
            >
              <SelectTrigger className="h-9 w-full rounded border border-[#e4e4e7] px-4">
                <SelectValue placeholder="Sélectionner (facultatif)" />
              </SelectTrigger>
              <SelectContent>
                {dossierTypes?.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#18181b]">
              Rôle requis
            </label>
            <Select value={roleId} onValueChange={(value) => setRoleId(value ?? "")}>
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
        </div>
        <DialogFooter>
          <Button
            className="bg-[#0f5499] text-sm font-medium tracking-normal text-white normal-case hover:bg-[#0f5499]/90"
            disabled={isPending || !name.trim()}
            onClick={handleSubmit}
          >
            {circuit ? "Enregistrer" : "Créer"}
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
