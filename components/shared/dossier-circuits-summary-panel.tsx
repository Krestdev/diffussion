"use client"

import Link from "next/link"
import { Route } from "lucide-react"

import { CircuitInstanceStatusBadge } from "@/components/shared/circuit-instance-status-badge"
import { useCircuitInstances } from "@/hooks/circuitInstance/useCircuitInstance"

/**
 * Read-only index of every circuit in progress or completed across this
 * dossier's courriers and documents — a circuit attaches to a courrier or a
 * document, never to the dossier itself (see CircuitInstancePanel), so
 * there's nothing to decide from here: each row links to the actual
 * courrier/document page where CircuitInstancePanel lives.
 */
export function DossierCircuitsSummaryPanel({ dossierId }: { dossierId: string }) {
  const { data: instances, isLoading } = useCircuitInstances({ dossierId })

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-[#dfdfdf] p-4">
      <div className="flex items-center gap-2">
        <Route className="size-5 text-[#52525b]" />
        <p className="text-base font-semibold text-[#18181b]">
          Circuits de validation
        </p>
      </div>

      {isLoading ? (
        <p className="text-sm text-[#71717a]">Chargement…</p>
      ) : !instances || instances.length === 0 ? (
        <p className="text-sm text-[#71717a]">
          Aucun circuit de validation dans ce dossier.
        </p>
      ) : (
        <ul className="flex flex-col gap-1.5">
          {instances.map((instance) => {
            const href = instance.courrier
              ? instance.courrier.direction === "SORTANT"
                ? `/courriers/sortants/${instance.courrier.id}`
                : `/courriers/entrants/${instance.courrier.id}`
              : instance.document
                ? `/documents/${instance.document.id}`
                : null
            const label = instance.courrier
              ? instance.courrier.subject
              : (instance.document?.originalName ?? "—")

            const row = (
              <div className="flex items-center gap-2 rounded border border-[#e4e4e7] px-3 py-1.5 text-sm">
                <span className="font-medium text-[#2f2f2f]">{label}</span>
                <span className="text-xs text-[#71717a]">
                  {instance.circuit.name} · étape {instance.currentStep.order}
                </span>
                <CircuitInstanceStatusBadge status={instance.status} className="ml-auto" />
              </div>
            )

            return (
              <li key={instance.id}>
                {href ? (
                  <Link href={href} className="block hover:underline">
                    {row}
                  </Link>
                ) : (
                  row
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
