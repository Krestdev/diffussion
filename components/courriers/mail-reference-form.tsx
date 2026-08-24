"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function MailReferenceForm() {
  const [subject, setSubject] = useState("")
  const [attachmentCount, setAttachmentCount] = useState(1)
  const [generated, setGenerated] = useState<string[]>([])

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setGenerated(
      Array.from({ length: attachmentCount }, (_, index) => {
        const suffix = String(Math.floor(Math.random() * 900) + 100)
        return `REF-2026-${suffix}${index}`
      })
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-[760px] flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#18181b]">
          Objet <span className="text-[#dc2626]">*</span>
        </label>
        <Textarea
          required
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          placeholder="ex. Immeuble Krest"
          className="min-h-[60px] rounded border border-[#e4e4e7] px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-1.5 sm:max-w-xs">
        <label className="text-sm font-medium text-[#18181b]">
          Nombre de Pièces Jointes <span className="text-[#dc2626]">*</span>
        </label>
        <input
          type="number"
          min={1}
          required
          value={attachmentCount}
          onChange={(event) => setAttachmentCount(Number(event.target.value))}
          className="h-9 rounded border border-[#e4e4e7] px-4 text-sm text-[#2f2f2f] outline-none"
        />
      </div>

      <div>
        <Button
          type="submit"
          className="h-11 rounded-lg bg-[#700032] px-5 text-base font-medium tracking-normal text-white normal-case hover:bg-[#700032]/90"
        >
          Générer
        </Button>
      </div>

      {generated.length > 0 && (
        <ul className="flex flex-col gap-2">
          {generated.map((reference) => (
            <li
              key={reference}
              className="w-fit rounded bg-[#f2cfde] px-3 py-1.5 text-sm font-medium text-[#2f2f2f]"
            >
              {reference}
            </li>
          ))}
        </ul>
      )}
    </form>
  )
}
