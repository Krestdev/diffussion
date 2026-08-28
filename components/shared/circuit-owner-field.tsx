"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAdminUsers } from "@/hooks/adminUser/useAdminUser"

/**
 * Owner picker for a courrier's creation form — chosen freely among the
 * application's users, same unfiltered list CircuitOwnerRow uses to
 * reassign it afterwards. Optional: can be left unset and completed later
 * by the creator, the site's responsible, or a platform admin.
 */
export function CircuitOwnerField({
  value,
  onChange,
}: {
  value: string
  onChange: (ownerId: string) => void
}) {
  const { data: users } = useAdminUsers()

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-[#18181b]">
        Propriétaire
      </label>
      <Select value={value} onValueChange={(v) => onChange(v ?? "")}>
        <SelectTrigger className="h-9 w-full rounded border border-[#e4e4e7] px-4">
          <SelectValue placeholder="Sélectionner (facultatif)" />
        </SelectTrigger>
        <SelectContent>
          {users?.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              {user.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
