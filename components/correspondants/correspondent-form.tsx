"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { correspondentTypes } from "@/components/correspondants/data"

export function CorrespondentForm() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [city, setCity] = useState("")
  const [mainContact, setMainContact] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [email, setEmail] = useState("")

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    router.push("/administration/correspondants")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid max-w-[760px] grid-cols-1 gap-4 md:grid-cols-2"
    >
      <div className="flex flex-col gap-1.5 md:col-span-2">
        <label className="text-sm font-medium text-[#18181b]">
          Nom / Raison sociale <span className="text-[#dc2626]">*</span>
        </label>
        <Input
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="ex. Krest Holding"
          className="min-h-10 rounded border border-[#e4e4e7] px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#18181b]">
          Type <span className="text-[#dc2626]">*</span>
        </label>
        <Select value={type} onValueChange={(value) => setType(value ?? "")} required>
          <SelectTrigger className="h-9 w-full rounded border border-[#e4e4e7] px-4">
            <SelectValue placeholder="Sélectionner" />
          </SelectTrigger>
          <SelectContent>
            {correspondentTypes.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
          Contact principal
        </label>
        <Input
          value={mainContact}
          onChange={(event) => setMainContact(event.target.value)}
          placeholder="ex. Patrick FOTSO"
          className="h-9 rounded border border-[#e4e4e7] px-4"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#18181b]">
          Numéro de téléphone
        </label>
        <div className="flex h-9 items-center gap-2 rounded border border-[#e4e4e7] px-4">
          <span className="text-sm text-[#2f2f2f]">+237</span>
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="697 568 784"
            className="flex-1 text-sm text-[#2f2f2f] outline-none placeholder:text-[#b0b0b0]"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#18181b]">Adresse</label>
        <Input
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          placeholder="ex. 369 Rue de la Paix"
          className="h-9 rounded border border-[#e4e4e7] px-4"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#18181b]">
          Adresse mail
        </label>
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="ex. contact@krestholding.com"
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
