"use client"

import { SummaryMetrics } from "@/components/shared/summary-metrics"
import { useCircuitInstances } from "@/hooks/circuitInstance/useCircuitInstance"
import { useCourriers } from "@/hooks/courrier/useCourrier"

export function ApprobationMetrics() {
  const { data: instances } = useCircuitInstances({ status: "IN_PROGRESS" })
  // Accepted/rejected are courrier-status counts (both directions) —
  // documents have no equivalent status field, so a completed document
  // circuit won't appear in these two, only in "En attente" while active.
  const { data: accepted } = useCourriers({ status: "VALIDE", take: 1 })
  const { data: rejected } = useCourriers({ status: "A_CORRIGER", take: 1 })

  const pending = instances?.length ?? 0

  return (
    <SummaryMetrics
      metrics={[
        {
          label: "En attente",
          value: pending,
          className: "border-[#eb88b4] bg-[#9e1351]",
        },
        {
          label: "Acceptés",
          value: accepted?.total ?? 0,
          className: "border-[#bbf7d0] bg-[#15803d]",
        },
        {
          label: "Rejetés",
          value: rejected?.total ?? 0,
          className: "border-[#dfdfdf] bg-white",
          labelClassName: "text-[#52525b]",
          valueClassName: "text-[#2f2f2f]",
        },
      ]}
    />
  )
}
