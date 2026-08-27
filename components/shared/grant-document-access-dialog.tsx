"use client"

import { GrantAccessDialog } from "@/components/shared/grant-access-dialog"
import { toast } from "@/components/ui/toast"
import { mergeAccessEntry } from "@/lib/access"
import { getApiErrorMessage } from "@/lib/apiError"
import { useDocumentAccess, useSetDocumentAccess } from "@/hooks/document/useDocument"

export function GrantDocumentAccessDialog({
  documentId,
  subtitle,
  open,
  onOpenChange,
}: {
  documentId: string
  subtitle: string
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { data: access } = useDocumentAccess(open ? documentId : "")
  const setAccess = useSetDocumentAccess()

  return (
    <GrantAccessDialog
      subtitle={subtitle}
      open={open}
      onOpenChange={onOpenChange}
      isPending={setAccess.isPending}
      onGrant={(entry) =>
        setAccess.mutate(
          { id: documentId, body: { entries: mergeAccessEntry(access, entry) } },
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
