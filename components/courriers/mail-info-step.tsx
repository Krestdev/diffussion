"use client"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CircuitOwnerField } from "@/components/shared/circuit-owner-field"
import { useCorrespondents } from "@/hooks/correspondent/useCorrespondent"
import { useCourrierNatures } from "@/hooks/courrierNature/useCourrierNature"
import { useDossiers } from "@/hooks/dossier/useDossier"
import type { MailDraft } from "@/components/courriers/types"

export function MailInfoStep({
  mode,
  draft,
  onChange,
  onNext,
}: {
  mode: "create" | "edit"
  draft: MailDraft
  onChange: (draft: MailDraft) => void
  onNext: () => void
}) {
  const { data: dossiers } = useDossiers()
  const { data: correspondents } = useCorrespondents()
  const { data: natures } = useCourrierNatures()

  function set<K extends keyof MailDraft>(key: K, value: MailDraft[K]) {
    onChange({ ...draft, [key]: value })
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    onNext()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2"
    >
      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label className="text-sm font-medium text-[#18181b]">
          Objet <span className="text-[#dc2626]">*</span>
        </label>
        <Textarea
          required
          value={draft.subject}
          onChange={(event) => set("subject", event.target.value)}
          placeholder="ex. Demande d'information sur le chantier"
          className="min-h-[60px] rounded border border-[#e4e4e7] px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#18181b]">
          Dossier <span className="text-[#dc2626]">*</span>
        </label>
        <Select
          value={draft.dossierId}
          onValueChange={(v) => set("dossierId", v ?? "")}
          required
        >
          <SelectTrigger className="h-9 w-full rounded border border-[#e4e4e7] px-4">
            <SelectValue placeholder="Sélectionner" />
          </SelectTrigger>
          <SelectContent>
            {dossiers?.data.map((dossier) => (
              <SelectItem key={dossier.id} value={dossier.id}>
                {dossier.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#18181b]">
          Correspondant
        </label>
        <Select
          value={draft.correspondentId}
          onValueChange={(v) => set("correspondentId", v ?? "")}
        >
          <SelectTrigger className="h-9 w-full rounded border border-[#e4e4e7] px-4">
            <SelectValue placeholder="Sélectionner" />
          </SelectTrigger>
          <SelectContent>
            {correspondents?.data.map((correspondent) => (
              <SelectItem key={correspondent.id} value={correspondent.id}>
                {correspondent.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#18181b]">Nature</label>
        <Select
          value={draft.natureId}
          onValueChange={(v) => set("natureId", v ?? "")}
        >
          <SelectTrigger className="h-9 w-full rounded border border-[#e4e4e7] px-4">
            <SelectValue placeholder="Sélectionner" />
          </SelectTrigger>
          <SelectContent>
            {natures?.map((nature) => (
              <SelectItem key={nature.id} value={nature.id}>
                {nature.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#18181b]">
          Référence (facultatif)
        </label>
        <input
          value={draft.reference}
          onChange={(event) => set("reference", event.target.value)}
          placeholder="Référence imprimée sur le courrier"
          className="h-9 rounded border border-[#e4e4e7] px-4 text-sm text-[#2f2f2f] outline-none placeholder:text-[#b0b0b0]"
        />
      </div>

      {/* Owner is create-only (see CourrierPayload) — reassigning an
          existing courrier's owner goes through CircuitOwnerRow instead. */}
      {mode === "create" && (
        <CircuitOwnerField
          dossierId={draft.dossierId}
          value={draft.ownerId}
          onChange={(ownerId) => set("ownerId", ownerId)}
        />
      )}

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
