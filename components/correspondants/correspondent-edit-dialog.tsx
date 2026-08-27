"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import { toast } from "@/components/ui/toast"
import { useCorrespondentTypes } from "@/hooks/correspondentType/useCorrespondentType"
import { useUpdateCorrespondent } from "@/hooks/correspondent/useCorrespondent"
import type { Correspondent } from "@/hooks/correspondent/type"

export function CorrespondentEditDialog({
  correspondent,
  open,
  onOpenChange,
}: {
  correspondent: Correspondent
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [name, setName] = useState(correspondent.name)
  const [city, setCity] = useState(correspondent.city ?? "")
  const [typeId, setTypeId] = useState(correspondent.typeId ?? "")
  const [mainContact, setMainContact] = useState(correspondent.mainContact ?? "")
  const [phone, setPhone] = useState(correspondent.phone ?? "")
  const [address, setAddress] = useState(correspondent.address ?? "")
  const [email, setEmail] = useState(correspondent.email ?? "")

  const { data: types } = useCorrespondentTypes()
  const updateCorrespondent = useUpdateCorrespondent()

  function handleSubmit() {
    updateCorrespondent.mutate(
      {
        id: correspondent.id,
        body: { name, city, typeId, mainContact, phone, address, email },
      },
      {
        onSuccess: () => {
          toast.add({ title: "Correspondant modifié", type: "success" })
          onOpenChange(false)
        },
        onError: () =>
          toast.add({
            title: "Échec de la modification",
            description: "Veuillez réessayer.",
            type: "error",
          }),
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[760px] gap-0 rounded-2xl p-4"
      >
        <DialogGradientHeader
          title={correspondent.name}
          subtitle="Correspondant"
          variant="secondary"
        />
        <div className="grid grid-cols-2 gap-x-3 gap-y-3 py-3">
          <div className="col-span-2 flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#18181b]">
              Nom / Raison sociale <span className="text-[#dc2626]">*</span>
            </label>
            <Input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="min-h-10 rounded border border-[#e4e4e7] px-3 py-2"
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
              className="h-9 rounded border border-[#e4e4e7] px-4"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#18181b]">
              Type <span className="text-[#dc2626]">*</span>
            </label>
            <Select
              value={typeId}
              onValueChange={(value) => setTypeId(value ?? "")}
              required
            >
              <SelectTrigger className="h-9 w-full rounded border border-[#e4e4e7] px-4">
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                {types?.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                className="flex-1 text-sm text-[#2f2f2f] outline-none placeholder:text-[#b0b0b0]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#18181b]">
              Adresse
            </label>
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
        </div>
        <DialogFooter>
          <Button
            className="bg-[#700032] text-sm font-medium tracking-normal text-white normal-case hover:bg-[#700032]/90"
            disabled={updateCorrespondent.isPending}
            onClick={handleSubmit}
          >
            Enregistrer
          </Button>
          <Button
            variant="outline"
            className="text-sm font-medium tracking-normal normal-case"
            onClick={() => onOpenChange(false)}
          >
            Annuler
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
