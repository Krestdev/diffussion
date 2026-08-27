"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RoleBadge } from "@/components/utilisateurs/role-badge"
import { useRoles } from "@/hooks/role/useRole"

export function RolePicker({
  roleIds,
  onChange,
}: {
  roleIds: string[]
  onChange: (roleIds: string[]) => void
}) {
  const [open, setOpen] = useState(false)
  const { data: roles } = useRoles()

  const selected = roles?.filter((role) => roleIds.includes(role.id)) ?? []
  const remaining = roles?.filter((role) => !roleIds.includes(role.id)) ?? []

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {selected.map((role) => (
        <button
          key={role.id}
          type="button"
          title="Retirer ce rôle"
          onClick={() => onChange(roleIds.filter((id) => id !== role.id))}
        >
          <RoleBadge role={role.name} />
        </button>
      ))}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="flex size-6 items-center justify-center rounded border border-[#e4e4e7] text-[#52525b]">
          <Plus className="size-4" />
          <span className="sr-only">Ajouter un rôle</span>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-1" align="start">
          {remaining.length === 0 && (
            <p className="px-2 py-1.5 text-sm text-muted-foreground">
              Tous les rôles sont assignés
            </p>
          )}
          {remaining.map((role) => (
            <button
              key={role.id}
              type="button"
              className="flex w-full items-center rounded px-2 py-1.5 text-left text-sm hover:bg-muted"
              onClick={() => {
                onChange([...roleIds, role.id])
                setOpen(false)
              }}
            >
              {role.name}
            </button>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  )
}
