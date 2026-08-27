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
import { ApprobationConfirmDialog } from "@/components/courriers-sortants/approbation-confirm-dialog"
import { useValidateCourrier, useVerifyCourrier } from "@/hooks/courrier/useCourrier"
import type { Courrier } from "@/hooks/courrier/type"

type OpenDialog = "approve" | "reject" | null

export function ApprobationRowActions({ mail }: { mail: Courrier }) {
  const [openDialog, setOpenDialog] = useState<OpenDialog>(null)
  const verifyCourrier = useVerifyCourrier()
  const validateCourrier = useValidateCourrier()

  // EN_VERIFICATION is the verifier's step, EN_VALIDATION is the
  // validator's — the Approbation queue shows a single "Approuver" action
  // for whichever step the courrier is currently waiting on.
  const isPending = verifyCourrier.isPending || validateCourrier.isPending

  function decide(approved: boolean) {
    const onSettled = {
      onSuccess: () => {
        toast.add({
          title: approved ? "Courrier approuvé" : "Courrier rejeté",
          type: "success",
        })
        setOpenDialog(null)
      },
      onError: (error: unknown) =>
        toast.add({
          title: "Échec de l'opération",
          description: getApiErrorMessage(error, "Veuillez réessayer."),
          type: "error",
        }),
    }
    if (mail.status === "EN_VERIFICATION") {
      verifyCourrier.mutate({ id: mail.id, approved }, onSettled)
    } else {
      validateCourrier.mutate({ id: mail.id, approved }, onSettled)
    }
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
          <DropdownMenuItem onClick={() => setOpenDialog("approve")}>
            Approuver
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setOpenDialog("reject")}
          >
            Rejeter
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ApprobationConfirmDialog
        title={mail.subject}
        subtitle="Courrier sortant"
        description="Êtes-vous sûr de vouloir approuver ce courrier ? Cette action est irréversible."
        confirmLabel="Oui, approuver"
        confirmClassName="bg-[#16a34a] text-white hover:bg-[#16a34a]/90"
        cancelLabel="Annuler"
        variant="success"
        onConfirm={() => decide(true)}
        isPending={isPending}
        open={openDialog === "approve"}
        onOpenChange={(open) => setOpenDialog(open ? "approve" : null)}
      />
      <ApprobationConfirmDialog
        title={mail.subject}
        subtitle="Courrier sortant"
        description="Êtes-vous sûr de vouloir rejeter ce courrier ? Il repassera en correction."
        confirmLabel="Oui, rejeter"
        confirmClassName="bg-destructive text-white hover:bg-destructive/90"
        cancelLabel="Annuler"
        variant="destructive"
        onConfirm={() => decide(false)}
        isPending={isPending}
        open={openDialog === "reject"}
        onOpenChange={(open) => setOpenDialog(open ? "reject" : null)}
      />
    </>
  )
}
