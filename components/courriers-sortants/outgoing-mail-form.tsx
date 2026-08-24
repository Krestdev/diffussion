"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { CirclePlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  correspondents,
  documentCategories,
  mailTypes,
  natures,
} from "@/components/courriers-sortants/data"
import type { OutgoingMail } from "@/components/courriers-sortants/types"
import { UserCombobox } from "@/components/shared/user-combobox"

type DocumentDraft = { fileName: string; name: string; category: string }

function emptyDocument(): DocumentDraft {
  return { fileName: "", name: "", category: "" }
}

export function OutgoingMailForm({
  mode,
  mail,
}: {
  mode: "create" | "edit"
  mail?: OutgoingMail
}) {
  const router = useRouter()

  const [subject, setSubject] = useState(mail?.subject ?? "")
  const [correspondent, setCorrespondent] = useState(mail?.correspondent ?? "")
  const [nature, setNature] = useState(mail?.nature ?? "")
  const [type, setType] = useState("")
  const [originMail, setOriginMail] = useState("")
  const [documents, setDocuments] = useState<DocumentDraft[]>([
    emptyDocument(),
    emptyDocument(),
  ])

  function updateDocument(index: number, patch: Partial<DocumentDraft>) {
    setDocuments((current) =>
      current.map((document, i) =>
        i === index ? { ...document, ...patch } : document
      )
    )
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    router.push("/courriers/sortants")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid max-w-[760px] grid-cols-1 gap-4 sm:grid-cols-2"
    >
      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label className="text-sm font-medium text-[#18181b]">
          Intitulé <span className="text-[#dc2626]">*</span>
        </label>
        <Textarea
          required
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          placeholder="ex. Rapport d'activité Juin 2026"
          className="min-h-10 rounded border border-[#e4e4e7] px-3 py-2"
        />
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

      <div className="flex flex-col gap-2 sm:col-span-2">
        <p className="text-base font-semibold text-black">Documents</p>
        <div className="grid grid-cols-1 gap-3 rounded-md border border-[#dfdfdf] p-3 sm:grid-cols-2">
          {documents.map((document, index) => (
            <div key={index} className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#18181b]">
                Document {index + 1} <span className="text-[#dc2626]">*</span>
              </label>
              <label className="relative flex h-9 cursor-pointer items-center rounded border border-[#e4e4e7] pr-3 pl-[140px] text-sm text-[#2f2f2f]">
                <input
                  type="file"
                  required
                  className="sr-only"
                  onChange={(event) =>
                    updateDocument(index, {
                      fileName: event.target.files?.[0]?.name ?? "",
                    })
                  }
                />
                <span className="absolute inset-y-0 left-0 flex items-center rounded-l bg-[#012] px-2 text-sm font-medium text-white">
                  Choisir un fichier
                </span>
                <span className="truncate">
                  {document.fileName || "Aucun fichier choisi"}
                </span>
              </label>
              <input
                type="text"
                value={document.name}
                onChange={(event) =>
                  updateDocument(index, { name: event.target.value })
                }
                placeholder="Nom du document"
                className="h-9 rounded border border-[#e4e4e7] px-3 text-sm text-[#2f2f2f] outline-none placeholder:text-[#b0b0b0]"
              />
              <Select
                value={document.category}
                onValueChange={(value) =>
                  updateDocument(index, { category: value ?? "" })
                }
              >
                <SelectTrigger className="h-9 w-full rounded border border-[#e4e4e7] px-4">
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {documentCategories.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            className="w-fit text-sm font-medium tracking-normal normal-case"
            onClick={() =>
              setDocuments((current) => [...current, emptyDocument()])
            }
          >
            Ajouter un document
            <CirclePlus className="size-5" />
          </Button>
        </div>
      </div>

      <div className="sm:col-span-2">
        <Button
          type="submit"
          className="h-11 rounded-lg bg-[#700032] px-5 text-base font-medium tracking-normal text-white normal-case hover:bg-[#700032]/90"
        >
          {mode === "edit" ? "Enregistrer les modifications" : "Enregistrer"}
        </Button>
      </div>
    </form>
  )
}
