import {
  Calendar,
  CircleHelp,
  CircleUser,
  Hash,
  Map,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import { SiteStatusBadge } from "@/components/sites/site-status-badge"
import type { Site } from "@/hooks/site/type"

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="flex gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f4f4f5]">
        <Icon className="size-6 text-[#52525b]" />
      </div>
      <div>
        <p className="text-sm text-[#52525b]">{label}</p>
        <div className="text-sm font-medium text-[#18181b]">{value}</div>
      </div>
    </div>
  )
}

export function SiteViewDialog({
  site,
  open,
  onOpenChange,
}: {
  site: Site
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[440px] gap-0 rounded-2xl p-4"
      >
        <DialogGradientHeader title={site.name} subtitle="Site" />
        <div className="flex flex-col gap-4 py-4">
          <InfoRow
            icon={Hash}
            label="Référence"
            value={
              <span className="rounded bg-[#f2cfde] px-1.5 py-0.5 text-[#2f2f2f]">
                {site.code}
              </span>
            }
          />
          <InfoRow icon={Map} label="Ville" value={site.city ?? "—"} />
          <InfoRow
            icon={CircleHelp}
            label="Statut"
            value={<SiteStatusBadge status={site.status} />}
          />
          <InfoRow
            icon={CircleUser}
            label="Responsable du Site"
            value={site.responsible?.name ?? "—"}
          />
          <InfoRow
            icon={Calendar}
            label="Créé le"
            value={new Date(site.createdAt).toLocaleDateString("fr-FR")}
          />
          <InfoRow
            icon={Calendar}
            label="Modifié le"
            value={new Date(site.updatedAt).toLocaleDateString("fr-FR")}
          />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            className="text-sm font-medium normal-case tracking-normal"
            onClick={() => onOpenChange(false)}
          >
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
