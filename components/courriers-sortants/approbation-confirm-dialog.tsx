import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import { cn } from "@/lib/utils"

/**
 * Approve/reject confirmation for the Approbation queue. Same
 * gradient-header + two-button pattern as components/courriers/mail-confirm-dialog.tsx,
 * but themed per-action (green "success" for approve) and with a
 * configurable cancel label, matching the "Annuler" copy in the Figma
 * approve dialog instead of the entrants flow's "Fermer".
 */
export function ApprobationConfirmDialog({
  title,
  subtitle,
  description,
  confirmLabel,
  confirmClassName,
  cancelLabel = "Fermer",
  variant = "secondary",
  onConfirm,
  isPending,
  open,
  onOpenChange,
}: {
  title: string
  subtitle: string
  description: string
  confirmLabel: string
  confirmClassName: string
  cancelLabel?: string
  variant?: "primary" | "secondary" | "success" | "destructive"
  onConfirm: () => void
  isPending?: boolean
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[460px] gap-0 rounded-2xl p-4"
      >
        <DialogGradientHeader
          title={title}
          subtitle={subtitle}
          variant={variant}
        />
        <p className="py-3 text-sm text-[#2f2f2f]">{description}</p>
        <DialogFooter>
          <Button
            className={cn(
              "text-sm font-medium tracking-normal normal-case",
              confirmClassName
            )}
            disabled={isPending}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
          <Button
            variant="outline"
            className="text-sm font-medium tracking-normal normal-case"
            onClick={() => onOpenChange(false)}
          >
            {cancelLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
