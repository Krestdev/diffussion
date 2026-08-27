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
import { useAdminUsers } from "@/hooks/adminUser/useAdminUser"
import { useUpdateSite } from "@/hooks/site/useSite"
import type { Site } from "@/hooks/site/type"

export function SiteEditDialog({
  site,
  open,
  onOpenChange,
}: {
  site: Site
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [name, setName] = useState(site.name)
  const [city, setCity] = useState(site.city ?? "")
  const [responsibleId, setResponsibleId] = useState(site.responsibleId ?? "")

  const { data: users } = useAdminUsers()
  const updateSite = useUpdateSite()

  function handleSubmit() {
    updateSite.mutate(
      { id: site.id, body: { name, city, responsibleId } },
      {
        onSuccess: () => {
          toast.add({ title: "Site modifié", type: "success" })
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
        className="max-w-[440px] gap-0 rounded-2xl p-4"
      >
        <DialogGradientHeader title={site.name} subtitle="Modifier le site" />
        <div className="flex flex-col gap-3 py-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#18181b]">
              Nom du site <span className="text-[#dc2626]">*</span>
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
              Responsable du site <span className="text-[#dc2626]">*</span>
            </label>
            <Select
              value={responsibleId}
              onValueChange={(value) => setResponsibleId(value ?? "")}
              required
            >
              <SelectTrigger className="h-9 w-full rounded border border-[#e4e4e7] px-4">
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                {users?.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            className="text-sm font-medium normal-case tracking-normal bg-[#700032] text-white hover:bg-[#700032]/90"
            disabled={updateSite.isPending}
            onClick={handleSubmit}
          >
            Soumettre
          </Button>
          <Button
            variant="outline"
            className="text-sm font-medium normal-case tracking-normal"
            onClick={() => onOpenChange(false)}
          >
            Annuler
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
