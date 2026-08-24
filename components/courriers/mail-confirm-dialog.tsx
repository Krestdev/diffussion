import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import { cn } from "@/lib/utils"

/**
 * Generic confirm dialog reusing the app's established
 * gradient-header + two-button confirmation pattern
 * (see the "Archiver le courrier" dialog it was modeled on).
 */
export function MailConfirmDialog({
  title,
  subtitle,
  description,
  confirmLabel,
  confirmClassName,
  open,
  onOpenChange,
}: {
  title: string
  subtitle: string
  description: string
  confirmLabel: string
  confirmClassName: string
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
          variant="secondary"
        />
        <p className="py-3 text-sm text-[#2f2f2f]">{description}</p>
        <DialogFooter>
          <Button
            className={cn(
              "text-sm font-medium tracking-normal normal-case",
              confirmClassName
            )}
            onClick={() => onOpenChange(false)}
          >
            {confirmLabel}
          </Button>
          <Button
            variant="outline"
            className="text-sm font-medium tracking-normal normal-case"
            onClick={() => onOpenChange(false)}
          >
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
