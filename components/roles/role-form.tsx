"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/toast"
import { usePermissions } from "@/hooks/permission/usePermission"
import { useCreateRole } from "@/hooks/role/useRole"

export function RoleForm() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [permissionIds, setPermissionIds] = useState<string[]>([])

  const { data: permissionOptions } = usePermissions()
  const createRole = useCreateRole()

  function togglePermission(id: string, checked: boolean) {
    setPermissionIds((current) =>
      checked ? [...current, id] : current.filter((item) => item !== id)
    )
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    createRole.mutate(
      { name, permissionIds },
      {
        onSuccess: () => {
          toast.add({ title: "Rôle créé", type: "success" })
          router.push("/administration/roles")
        },
        onError: () =>
          toast.add({
            title: "Échec de la création",
            description: "Veuillez réessayer.",
            type: "error",
          }),
      }
    )
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
          {permissionOptions?.map((permission) => (
            <label
              key={permission.id}
              className="flex items-center gap-2 text-sm text-[#2f2f2f]"
            >
              <Checkbox
                checked={permissionIds.includes(permission.id)}
                onCheckedChange={(checked) =>
                  togglePermission(permission.id, checked === true)
                }
              />
              {permission.description ?? permission.code}
            </label>
          ))}
        </div>
      </div>

      <div>
        <Button
          type="submit"
          disabled={createRole.isPending}
          className="h-11 rounded-lg bg-[#700032] px-5 text-base font-medium tracking-normal text-white normal-case hover:bg-[#700032]/90"
        >
          Créer le rôle
        </Button>
      </div>
    </form>
  )
}
