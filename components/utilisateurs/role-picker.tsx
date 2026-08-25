"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { availableRoles } from "@/components/utilisateurs/data"
import { RoleBadge } from "@/components/utilisateurs/role-badge"

export function RolePicker({
  roles,
  onChange,
}: {
  roles: string[]
  onChange: (roles: string[]) => void
}) {
  const [open, setOpen] = useState(false)
  const remaining = availableRoles.filter((role) => !roles.includes(role))

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {roles.map((role) => (
        <button
          key={role}
          type="button"
          title="Retirer ce rôle"
          onClick={() => onChange(roles.filter((item) => item !== role))}
        >
          <RoleBadge role={role} />
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
              key={role}
              type="button"
              className="flex w-full items-center rounded px-2 py-1.5 text-left text-sm hover:bg-muted"
              onClick={() => {
                onChange([...roles, role])
                setOpen(false)
              }}
            >
              {role}
            </button>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  )
}
