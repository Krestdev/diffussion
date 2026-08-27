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
import { useDecideCircuitInstance } from "@/hooks/circuitInstance/useCircuitInstance"
import type { CircuitInstance } from "@/hooks/circuitInstance/type"

type OpenDialog = "approve" | "reject" | null

// Target can be a courrier (either direction) or a document — resolve to
// each one's own detail route rather than assuming sortant.
function targetHref(instance: CircuitInstance) {
  if (instance.courrier) {
    return instance.courrier.direction === "SORTANT"
      ? `/courriers/sortants/${instance.courrier.id}`
      : `/courriers/entrants/${instance.courrier.id}`
  }
  if (instance.document) return `/documents/${instance.document.id}`
  return null
}

export function ApprobationRowActions({ instance }: { instance: CircuitInstance }) {
  const [openDialog, setOpenDialog] = useState<OpenDialog>(null)
  const decide = useDecideCircuitInstance()
  const href = targetHref(instance)

  function handleDecide(approved: boolean) {
    decide.mutate(
      {
        id: instance.id,
        body: { decision: approved ? "VALIDE" : "CORRECTIONS_DEMANDEES" },
      },
      {
        onSuccess: () => {
          toast.add({
            title: approved ? "Étape approuvée" : "Étape rejetée",
            type: "success",
          })
          setOpenDialog(null)
        },
        onError: (error) =>
          toast.add({
            title: "Échec de l'opération",
            description: getApiErrorMessage(error, "Veuillez réessayer."),
            type: "error",
          }),
      }
    )
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
          {href && (
            <DropdownMenuItem render={<Link href={href} />}>
              Voir
            </DropdownMenuItem>
          )}
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
        title={instance.courrier?.subject ?? instance.document?.originalName ?? instance.circuit.name}
        subtitle={`Étape : ${instance.currentStep.actionType ?? instance.currentStep.order}`}
        description="Êtes-vous sûr de vouloir approuver cette étape ? Si c'est la dernière du circuit, le courrier sera validé."
        confirmLabel="Oui, approuver"
        confirmClassName="bg-[#16a34a] text-white hover:bg-[#16a34a]/90"
        cancelLabel="Annuler"
        variant="success"
        onConfirm={() => handleDecide(true)}
        isPending={decide.isPending}
        open={openDialog === "approve"}
        onOpenChange={(open) => setOpenDialog(open ? "approve" : null)}
      />
      <ApprobationConfirmDialog
        title={instance.courrier?.subject ?? instance.document?.originalName ?? instance.circuit.name}
        subtitle={`Étape : ${instance.currentStep.actionType ?? instance.currentStep.order}`}
        description="Êtes-vous sûr de vouloir rejeter cette étape ? Le circuit reviendra à l'étape précédente, ou le courrier repassera en correction s'il n'y en a pas."
        confirmLabel="Oui, rejeter"
        confirmClassName="bg-destructive text-white hover:bg-destructive/90"
        cancelLabel="Annuler"
        variant="destructive"
        onConfirm={() => handleDecide(false)}
        isPending={decide.isPending}
        open={openDialog === "reject"}
        onOpenChange={(open) => setOpenDialog(open ? "reject" : null)}
      />
    </>
  )
}
