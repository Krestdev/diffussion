"use client"

import { GrantAccessDialog } from "@/components/shared/grant-access-dialog"
import { toast } from "@/components/ui/toast"
import { mergeAccessEntry } from "@/lib/access"
import { getApiErrorMessage } from "@/lib/apiError"
import { useDossierAccess, useSetDossierAccess } from "@/hooks/dossier/useDossier"

/** Self-contained: fetches and saves the dossier's own access list itself,
 * so it can be dropped into any row-actions menu or page header. */
export function GrantDossierAccessDialog({
  dossierId,
  subtitle,
  open,
  onOpenChange,
}: {
  dossierId: string
  subtitle: string
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { data: access } = useDossierAccess(open ? dossierId : "")
  const setAccess = useSetDossierAccess()

  return (
    <GrantAccessDialog
      subtitle={subtitle}
      open={open}
      onOpenChange={onOpenChange}
      isPending={setAccess.isPending}
      onGrant={(entry) =>
        setAccess.mutate(
          { id: dossierId, body: { entries: mergeAccessEntry(access, entry) } },
          {
            onSuccess: () => {
              toast.add({ title: "Accès accordé", type: "success" })
              onOpenChange(false)
            },
            onError: (error) =>
              toast.add({
                title: "Échec de l'octroi d'accès",
                description: getApiErrorMessage(error, "Veuillez réessayer."),
                type: "error",
              }),
          }
        )
      }
    />
  )
}
