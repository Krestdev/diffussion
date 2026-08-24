"use client"

import { useState } from "react"
import { ChevronDown, Search } from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export function UserCombobox({
  users,
  value,
  onChange,
  placeholder = "Rechercher un utilisateur",
}: {
  users: readonly string[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          "flex h-9 w-full items-center gap-2 rounded border border-[#e4e4e7] px-4 text-sm",
          value ? "text-[#2f2f2f]" : "text-[#b0b0b0]"
        )}
      >
        <Search className="size-5 shrink-0 text-muted-foreground" />
        <span className="flex-1 truncate text-left">
          {value || placeholder}
        </span>
        <ChevronDown className="size-5 shrink-0 text-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent className="w-(--anchor-width) p-0" align="start">
        <Command>
          <CommandList>
            <CommandEmpty>Aucun utilisateur trouvé.</CommandEmpty>
            <CommandGroup>
              {users.map((user) => (
                <CommandItem
                  key={user}
                  value={user}
                  onSelect={() => {
                    onChange(user)
                    setOpen(false)
                  }}
                >
                  {user}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
