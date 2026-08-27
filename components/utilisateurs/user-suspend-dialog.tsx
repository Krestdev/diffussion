"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import { toast } from "@/components/ui/toast"
import { useToggleAdminUserStatus } from "@/hooks/adminUser/useAdminUser"
import type { AppUser } from "@/hooks/adminUser/type"

export function UserSuspendDialog({
  user,
  open,
  onOpenChange,
}: {
  user: AppUser
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const isActive = user.status === "ACTIVE"
  const action = isActive ? "suspendre" : "réactiver"
  const toggleStatus = useToggleAdminUserStatus()

  function handleConfirm() {
    toggleStatus.mutate(user.id, {
      onSuccess: () => {
        toast.add({ title: "Statut mis à jour", type: "success" })
        onOpenChange(false)
      },
      onError: () =>
        toast.add({
          title: "Échec de la mise à jour",
          description: "Veuillez réessayer.",
          type: "error",
        }),
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[460px] gap-0 rounded-2xl p-4"
      >
        <DialogGradientHeader
          title={user.name}
          subtitle="Utilisateur"
          variant={isActive ? "destructive" : "success"}
        />
        <p className="py-3 text-sm text-[#2f2f2f]">
          Êtes-vous sûr de vouloir <span className="font-bold">{action}</span>{" "}
          cet utilisateur ?{" "}
          {isActive
            ? "Il n’aura plus accès à l’application."
            : "Il retrouvera l’accès à l’application."}
        </p>
        <DialogFooter>
          <Button
            className={
              isActive
                ? "bg-destructive text-sm font-medium tracking-normal text-white normal-case hover:bg-destructive/90"
                : "bg-[#16a34a] text-sm font-medium tracking-normal text-white normal-case hover:bg-[#16a34a]/90"
            }
            disabled={toggleStatus.isPending}
            onClick={handleConfirm}
          >
            Oui, {action}
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
