"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEligibleCircuitOwners } from "@/hooks/circuitInstance/useCircuitInstance"

/**
 * Circuit owner (10.6) picker for a courrier's creation form — restricted to
 * holders of the role its dossier's circuit requires, on that dossier's own
 * site (see CircuitInstanceService.getEligibleOwners). Renders nothing until
 * a dossier is chosen, and a hint instead of a dropdown when no circuit/role
 * is configured yet or nobody is eligible — ownership is always optional
 * here and can be completed later via CircuitOwnerRow (the creator, the
 * site's responsible, or a platform admin).
 */
export function CircuitOwnerField({
  dossierId,
  value,
  onChange,
}: {
  dossierId: string
  value: string
  onChange: (ownerId: string) => void
}) {
  const { data } = useEligibleCircuitOwners(dossierId)

  if (!dossierId) return null

  if (!data || data.users.length === 0) {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#18181b]">
          Propriétaire du circuit
        </label>
        <p className="text-xs text-[#71717a]">
          {data?.circuit
            ? "Aucun utilisateur éligible pour ce rôle sur ce site — pourra être défini plus tard."
            : "Aucun circuit configuré pour ce type de dossier — pourra être défini plus tard."}
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-[#18181b]">
        Propriétaire du circuit
      </label>
      <Select value={value} onValueChange={(v) => onChange(v ?? "")}>
        <SelectTrigger className="h-9 w-full rounded border border-[#e4e4e7] px-4">
          <SelectValue placeholder="Sélectionner (facultatif)" />
        </SelectTrigger>
        <SelectContent>
          {data.users.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              {user.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
