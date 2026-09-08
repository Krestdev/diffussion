"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCourriers } from "@/hooks/courrier/useCourrier"

// "Répond à" (self-reference, either direction) — candidates are other
// courriers already in the same dossier, since a reply is almost always
// filed alongside what it responds to.
export function RespondsToField({
  dossierId,
  value,
  onChange,
}: {
  dossierId: string
  value: string
  onChange: (courrierId: string) => void
}) {
  const { data } = useCourriers({ dossierId, take: 100 })
  const candidates = data?.data ?? []

  if (!dossierId) return null

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-[#18181b]">
        Répond au courrier
      </label>
      <Select value={value} onValueChange={(v) => onChange(v ?? "")}>
        <SelectTrigger className="h-9 w-full rounded border border-[#e4e4e7] px-4">
          <SelectValue placeholder="Sélectionner (facultatif)" />
        </SelectTrigger>
        <SelectContent>
          {candidates.map((courrier) => (
            <SelectItem key={courrier.id} value={courrier.id}>
              {courrier.number} — {courrier.subject}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
