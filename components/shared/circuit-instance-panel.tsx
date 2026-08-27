"use client"

import { useState } from "react"
import { Check, Circle, Route } from "lucide-react"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { cn } from "@/lib/utils"
import { getApiErrorMessage } from "@/lib/apiError"
import { ApprobationConfirmDialog } from "@/components/courriers-sortants/approbation-confirm-dialog"
import { CircuitInstanceStatusBadge } from "@/components/shared/circuit-instance-status-badge"
import { CircuitOwnerRow } from "@/components/shared/circuit-owner-row"
import {
  useCircuitInstances,
  useDecideCircuitInstance,
  useStartCircuitInstance,
} from "@/hooks/circuitInstance/useCircuitInstance"
import { useCourrier, useSetCourrierOwner } from "@/hooks/courrier/useCourrier"
import { useDocument, useSetDocumentOwner } from "@/hooks/document/useDocument"

type OpenDialog = "approve" | "reject" | null
type Target = { courrierId: string; documentId?: never } | { documentId: string; courrierId?: never }

// Replaces CircuitStubPanel now that CircuitInstance actually tracks
// progress. A circuit attaches to a courrier (entrant or sortant — both
// share the same EN_CIRCUIT/VALIDE/A_CORRIGER statuses) or a document,
// never to a bare dossier: see the Dossier detail page's read-only
// DossierCircuitsSummaryPanel for that view instead.
//
// A courrier's circuit is started via its own page's "Soumettre pour
// vérification" action, not from here — this panel just shows/decides
// progress for it. A document has no such status-driven trigger, so this
// panel offers a manual "Démarrer un circuit" button when passed a
// documentId with no instance yet.
export function CircuitInstancePanel(props: Target) {
  const { courrierId, documentId } = props
  const { data: instances, isLoading } = useCircuitInstances(
    courrierId ? { courrierId } : { documentId }
  )
  const startCircuit = useStartCircuitInstance()
  const decide = useDecideCircuitInstance()
  const [openDialog, setOpenDialog] = useState<OpenDialog>(null)

  // The owner (10.6) belongs to the courrier/document itself, not to any
  // one instance — fetched here regardless of whether a circuit has
  // started yet. TanStack Query dedupes this against the parent page's own
  // useCourrier/useDocument call, so it's not an extra request.
  const { data: courrier } = useCourrier(courrierId ?? "")
  const { data: document } = useDocument(documentId ?? "")
  const setCourrierOwner = useSetCourrierOwner()
  const setDocumentOwner = useSetDocumentOwner()
  const ownerId = courrier?.ownerId ?? document?.ownerId ?? null
  const settingOwner = setCourrierOwner.isPending || setDocumentOwner.isPending

  // Most recent instance first (backend orders by id desc) — a courrier/
  // document only ever has one active instance at a time in practice.
  const instance = instances?.[0]

  function handleSetOwner(newOwnerId: string) {
    const callbacks = {
      onSuccess: () =>
        toast.add({ title: "Propriétaire mis à jour", type: "success" }),
      onError: (error: unknown) =>
        toast.add({
          title: "Échec de l'opération",
          description: getApiErrorMessage(error, "Veuillez réessayer."),
          type: "error",
        }),
    }
    if (courrierId) {
      setCourrierOwner.mutate({ id: courrierId, ownerId: newOwnerId }, callbacks)
    } else if (documentId) {
      setDocumentOwner.mutate({ id: documentId, ownerId: newOwnerId }, callbacks)
    }
  }

  function handleStart() {
    if (!documentId) return
    startCircuit.mutate(
      { documentId },
      {
        onSuccess: () =>
          toast.add({ title: "Circuit démarré", type: "success" }),
        onError: (error) =>
          toast.add({
            title: "Impossible de démarrer le circuit",
            description: getApiErrorMessage(error, "Veuillez réessayer."),
            type: "error",
          }),
      }
    )
  }

  function handleDecide(approved: boolean) {
    if (!instance) return
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
    <div className="flex flex-col gap-3 rounded-xl border border-[#dfdfdf] p-4">
      <div className="flex items-center gap-2">
        <Route className="size-5 text-[#52525b]" />
        <p className="text-base font-semibold text-[#18181b]">
          Circuit de validation
        </p>
      </div>

      {isLoading ? (
        <p className="text-sm text-[#71717a]">Chargement…</p>
      ) : !instance ? (
        <>
          <p className="text-sm text-[#71717a]">
            Aucun circuit de validation actif pour le moment.
          </p>
          {documentId && (
            <Button
              variant="outline"
              className="w-fit text-sm font-medium tracking-normal normal-case"
              disabled={startCircuit.isPending}
              onClick={handleStart}
            >
              Démarrer un circuit
            </Button>
          )}
        </>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[#2f2f2f]">
              {instance.circuit.name}
            </span>
            <CircuitInstanceStatusBadge status={instance.status} />
          </div>
          <ol className="flex flex-col gap-1.5">
            {instance.circuit.steps.map((step) => {
              const isCurrent = step.id === instance.currentStepId
              const isVisited = instance.stepHistory.some(
                (entry) => entry.circuitStep.id === step.id
              )
              return (
                <li
                  key={step.id}
                  className={cn(
                    "flex items-center gap-2 rounded border px-3 py-1.5 text-sm",
                    isCurrent
                      ? "border-[#fde68a] bg-[#fef3c7] text-[#b45309]"
                      : isVisited
                        ? "border-[#e4e4e7] bg-white text-[#2f2f2f]"
                        : "border-[#e4e4e7] bg-[#fafafa] text-[#a1a1aa]"
                  )}
                >
                  {isCurrent ? (
                    <Circle className="size-4 shrink-0 fill-current" />
                  ) : isVisited ? (
                    <Check className="size-4 shrink-0" />
                  ) : (
                    <Circle className="size-4 shrink-0" />
                  )}
                  <span className="font-medium">
                    {step.order}. {step.actionType ?? "Étape"}
                  </span>
                  {step.role && (
                    <span className="text-xs">— rôle requis : {step.role.name}</span>
                  )}
                  {isCurrent && instance.status === "IN_PROGRESS" && (
                    <span className="ml-auto text-xs font-semibold">En cours</span>
                  )}
                </li>
              )
            })}
          </ol>

          {instance.status === "IN_PROGRESS" && (
            <div className="flex gap-2">
              <Button
                className="bg-[#16a34a] text-sm font-medium tracking-normal text-white normal-case hover:bg-[#16a34a]/90"
                onClick={() => setOpenDialog("approve")}
              >
                Valider
              </Button>
              <Button
                variant="outline"
                className="text-sm font-medium tracking-normal normal-case text-destructive"
                onClick={() => setOpenDialog("reject")}
              >
                Rejeter
              </Button>
            </div>
          )}

          {instance.validations.length > 0 && (
            <ul className="flex flex-col gap-1 border-t border-[#e4e4e7] pt-2">
              {instance.validations.map((validation) => (
                <li key={validation.id} className="text-xs text-[#71717a]">
                  {validation.validator.name} —{" "}
                  {validation.decision === "VALIDE" ? "Validé" : validation.decision === "REJETE" ? "Rejeté" : "Corrections demandées"}
                  {validation.motif ? ` (${validation.motif})` : ""} ·{" "}
                  {new Date(validation.decidedAt).toLocaleDateString("fr-FR")}
                </li>
              ))}
            </ul>
          )}

          <ApprobationConfirmDialog
            title={instance.circuit.name}
            subtitle={`Étape ${instance.currentStep.order}`}
            description="Êtes-vous sûr de vouloir valider cette étape ? Si c'est la dernière du circuit, l'élément sera validé."
            confirmLabel="Oui, valider"
            confirmClassName="bg-[#16a34a] text-white hover:bg-[#16a34a]/90"
            cancelLabel="Annuler"
            variant="success"
            onConfirm={() => handleDecide(true)}
            isPending={decide.isPending}
            open={openDialog === "approve"}
            onOpenChange={(open) => setOpenDialog(open ? "approve" : null)}
          />
          <ApprobationConfirmDialog
            title={instance.circuit.name}
            subtitle={`Étape ${instance.currentStep.order}`}
            description="Êtes-vous sûr de vouloir rejeter cette étape ? Le circuit reviendra à l'étape précédente, ou sera annulé s'il n'y en a pas."
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
      )}

      <CircuitOwnerRow
        ownerId={ownerId}
        onSetOwner={handleSetOwner}
        isSaving={settingOwner}
      />
    </div>
  )
}
