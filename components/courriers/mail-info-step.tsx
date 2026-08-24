"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  correspondents,
  generatedReferences,
  mailTypes,
  natures,
} from "@/components/courriers/data"
import type { Mail } from "@/components/courriers/types"
import { UserCombobox } from "@/components/shared/user-combobox"

export function MailInfoStep({
  mail,
  onNext,
}: {
  mail?: Mail
  onNext: () => void
}) {
  const [reference, setReference] = useState("")
  const [correspondent, setCorrespondent] = useState(mail?.correspondent ?? "")
  const [nature, setNature] = useState(mail?.nature ?? "")
  const [type, setType] = useState(mail?.type ?? "")
  const [originMail, setOriginMail] = useState(mail?.originMail ?? "")

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    onNext()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2"
    >
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#18181b]">
          Référence <span className="text-[#dc2626]">*</span>
        </label>
        <Select
          value={reference}
          onValueChange={(v) => setReference(v ?? "")}
          required
        >
          <SelectTrigger className="h-9 w-full rounded border border-[#e4e4e7] px-4">
            <SelectValue placeholder="Sélectionner" />
          </SelectTrigger>
          <SelectContent>
            {generatedReferences.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#18181b]">
          Correspondant <span className="text-[#dc2626]">*</span>
        </label>
        <UserCombobox
          users={correspondents}
          value={correspondent}
          onChange={setCorrespondent}
          placeholder="Rechercher un correspondant"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#18181b]">
          Nature <span className="text-[#dc2626]">*</span>
        </label>
        <Select
          value={nature}
          onValueChange={(v) => setNature(v ?? "")}
          required
        >
          <SelectTrigger className="h-9 w-full rounded border border-[#e4e4e7] px-4">
            <SelectValue placeholder="Sélectionner" />
          </SelectTrigger>
          <SelectContent>
            {natures.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#18181b]">
          Type <span className="text-[#dc2626]">*</span>
        </label>
        <Select value={type} onValueChange={(v) => setType(v ?? "")} required>
          <SelectTrigger className="h-9 w-full rounded border border-[#e4e4e7] px-4">
            <SelectValue placeholder="Sélectionner" />
          </SelectTrigger>
          <SelectContent>
            {mailTypes.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#18181b]">
          Courrier d’origine
        </label>
        <Select
          value={originMail}
          onValueChange={(v) => setOriginMail(v ?? "")}
        >
          <SelectTrigger className="h-9 w-full rounded border border-[#e4e4e7] px-4">
            <SelectValue placeholder="Sélectionner" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="M-01">M-01</SelectItem>
            <SelectItem value="M-02">M-02</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="sm:col-span-2">
        <Button
          type="submit"
          className="h-11 rounded-lg bg-[#700032] px-5 text-base font-medium tracking-normal text-white normal-case hover:bg-[#700032]/90"
        >
          Suivant
        </Button>
      </div>
    </form>
  )
}
