import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import type { Site } from "@/components/sites/types"

export function SiteToggleStatusDialog({
  site,
  open,
  onOpenChange,
}: {
  site: Site
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const isActive = site.status === "active"
  const action = isActive ? "désactiver" : "activer"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[460px] gap-0 rounded-2xl p-4"
      >
        <DialogGradientHeader title={site.name} subtitle="Site" />
        <p className="py-3 text-sm text-[#2f2f2f]">
          Êtes-vous sûr de vouloir <span className="font-bold">{action}</span>{" "}
          ce site ?{" "}
          {isActive
            ? "Les employés associés n’auront plus accès à l’application."
            : "Les employés associés retrouveront l’accès à l’application."}
        </p>
        <DialogFooter>
          <Button
            className={
              isActive
                ? "text-sm font-medium normal-case tracking-normal bg-[#ef4444] text-white hover:bg-[#ef4444]/90"
                : "text-sm font-medium normal-case tracking-normal bg-[#16a34a] text-white hover:bg-[#16a34a]/90"
            }
            onClick={() => onOpenChange(false)}
          >
            Oui, {action}
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
