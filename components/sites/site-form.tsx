"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { users } from "@/components/sites/data"
import { UserCombobox } from "@/components/shared/user-combobox"

export function SiteForm() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [city, setCity] = useState("")
  const [manager, setManager] = useState("")

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    router.push("/administration/sites")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid max-w-2xl grid-cols-1 gap-4 md:grid-cols-2"
    >
      <div className="flex flex-col gap-1.5 md:col-span-2">
        <label className="text-sm font-medium text-[#18181b]">
          Nom du site <span className="text-[#dc2626]">*</span>
        </label>
        <Input
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="ex. Immeuble Krest"
          className="h-9 rounded border border-[#e4e4e7] px-4"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#18181b]">
          Ville <span className="text-[#dc2626]">*</span>
        </label>
        <Input
          required
          value={city}
          onChange={(event) => setCity(event.target.value)}
          placeholder="Nom de la ville"
          className="h-9 rounded border border-[#e4e4e7] px-4"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#18181b]">
          Responsable du site <span className="text-[#dc2626]">*</span>
        </label>
        <UserCombobox users={users} value={manager} onChange={setManager} />
      </div>

      <div className="md:col-span-2">
        <Button
          type="submit"
          className="h-11 rounded-lg bg-[#700032] px-5 text-base font-medium tracking-normal text-white normal-case hover:bg-[#700032]/90"
        >
          Créer le site
        </Button>
      </div>
    </form>
  )
}
