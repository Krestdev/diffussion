"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { permissionOptions } from "@/components/roles/data"

export function RoleForm() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [permissions, setPermissions] = useState<string[]>([])

  function togglePermission(permission: string, checked: boolean) {
    setPermissions((current) =>
      checked
        ? [...current, permission]
        : current.filter((item) => item !== permission)
    )
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    router.push("/administration/roles")
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#18181b]">
          Nom <span className="text-[#dc2626]">*</span>
        </label>
        <Input
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="ex. Krest Holding"
          className="h-9 w-full max-w-md rounded border border-[#e4e4e7] px-4"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#18181b]">
          Permissions <span className="text-[#dc2626]">*</span>
        </label>
        <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
          {permissionOptions.map((permission) => (
            <label
              key={permission}
              className="flex items-center gap-2 text-sm text-[#2f2f2f]"
            >
              <Checkbox
                checked={permissions.includes(permission)}
                onCheckedChange={(checked) =>
                  togglePermission(permission, checked === true)
                }
              />
              {permission}
            </label>
          ))}
        </div>
      </div>

      <div>
        <Button
          type="submit"
          className="h-11 rounded-lg bg-[#700032] px-5 text-base font-medium tracking-normal text-white normal-case hover:bg-[#700032]/90"
        >
          Créer le rôle
        </Button>
      </div>
    </form>
  )
}
