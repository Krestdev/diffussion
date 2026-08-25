"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RolePicker } from "@/components/utilisateurs/role-picker"

export function UserForm() {
  const router = useRouter()

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [roles, setRoles] = useState<string[]>(["Exécutant"])
  const [userFunction, setUserFunction] = useState("")
  const [phone, setPhone] = useState("")

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    router.push("/administration/utilisateurs")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid max-w-2xl grid-cols-1 gap-4 md:grid-cols-2"
    >
      <div className="flex flex-col gap-1.5 md:col-span-2">
        <label className="text-sm font-medium text-[#18181b]">
          Nom complet <span className="text-[#dc2626]">*</span>
        </label>
        <Input
          required
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          placeholder="ex. Patrick BALANG"
          className="h-9 rounded border border-[#e4e4e7] px-4"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#18181b]">
          Adresse mail <span className="text-[#dc2626]">*</span>
        </label>
        <Input
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="ex. patrick.malang@gmail.com"
          className="h-9 rounded border border-[#e4e4e7] px-4"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#18181b]">
          Rôle <span className="text-[#dc2626]">*</span>
        </label>
        <RolePicker roles={roles} onChange={setRoles} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#18181b]">
          Fonction
        </label>
        <Input
          value={userFunction}
          onChange={(event) => setUserFunction(event.target.value)}
          placeholder="ex. Bandit"
          className="h-9 rounded border border-[#e4e4e7] px-4"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#18181b]">
          Numéro de téléphone
        </label>
        <Input
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="+237"
          className="h-9 rounded border border-[#e4e4e7] px-4"
        />
      </div>

      <div className="md:col-span-2">
        <Button
          type="submit"
          className="h-11 rounded-lg bg-[#700032] px-5 text-base font-medium tracking-normal text-white normal-case hover:bg-[#700032]/90"
        >
          Enregistrer
        </Button>
      </div>
    </form>
  )
}
