"use client"

import Link from "next/link"
import { useState } from "react"
import { Ellipsis } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/toast"
import { getApiErrorMessage } from "@/lib/apiError"
import { OutgoingMailCancelDialog } from "@/components/courriers-sortants/outgoing-mail-cancel-dialog"
import { GrantCourrierAccessDialog } from "@/components/shared/grant-courrier-access-dialog"
import { useSubmitCourrierForVerification } from "@/hooks/courrier/useCourrier"
import type { Courrier, CourrierStatus } from "@/hooks/courrier/type"

const EDITABLE_STATUSES: CourrierStatus[] = ["BROUILLON", "A_CORRIGER"]
const CANCELLABLE_STATUSES: CourrierStatus[] = [
  "BROUILLON",
  "EN_VERIFICATION",
  "A_CORRIGER",
  "EN_VALIDATION",
]

// "Voir" now opens the full detail page — see
// app/(dashboard)/courriers/sortants/[id]/page.tsx.
export function OutgoingMailRowActions({ mail }: { mail: Courrier }) {
  const [cancelOpen, setCancelOpen] = useState(false)
  const [grantOpen, setGrantOpen] = useState(false)
  const submitForVerification = useSubmitCourrierForVerification()

  function handleSubmitForVerification() {
    submitForVerification.mutate(mail.id, {
      onSuccess: () =>
        toast.add({ title: "Courrier soumis pour vérification", type: "success" }),
      onError: (error) =>
        toast.add({
          title: "Échec de la soumission",
          description: getApiErrorMessage(error, "Veuillez réessayer."),
          type: "error",
        }),
    })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="outline" size="icon-sm" className="rounded" />
          }
        >
          <Ellipsis className="size-4" />
          <span className="sr-only">Actions</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            render={<Link href={`/courriers/sortants/${mail.id}`} />}
          >
            Voir
          </DropdownMenuItem>
          {EDITABLE_STATUSES.includes(mail.status) && (
            <DropdownMenuItem
              render={<Link href={`/courriers/sortants/${mail.id}/modifier`} />}
            >
              Modifier
            </DropdownMenuItem>
          )}
          {EDITABLE_STATUSES.includes(mail.status) && (
            <DropdownMenuItem
              disabled={submitForVerification.isPending}
              onClick={handleSubmitForVerification}
            >
              Soumettre pour vérification
            </DropdownMenuItem>
          )}
          {CANCELLABLE_STATUSES.includes(mail.status) && (
            <DropdownMenuItem
              variant="destructive"
              onClick={() => setCancelOpen(true)}
            >
              Annuler
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => setGrantOpen(true)}>
            Accorder l&apos;accès
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <OutgoingMailCancelDialog
        mail={mail}
        open={cancelOpen}
        onOpenChange={setCancelOpen}
      />
      <GrantCourrierAccessDialog
        courrierId={mail.id}
        subtitle={mail.subject}
        open={grantOpen}
        onOpenChange={setGrantOpen}
      />
    </>
  )
}
