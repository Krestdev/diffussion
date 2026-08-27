"use client"

import { SummaryMetrics } from "@/components/shared/summary-metrics"
import { useCourriers } from "@/hooks/courrier/useCourrier"

export function OutgoingMailsMetrics() {
  const { data: pending } = useCourriers({ direction: "SORTANT", status: "EN_VERIFICATION", take: 1 })
  const { data: approved } = useCourriers({ direction: "SORTANT", status: "VALIDE", take: 1 })
  const { data: all } = useCourriers({ direction: "SORTANT", take: 1 })

  return (
    <SummaryMetrics
      metrics={[
        {
          label: "En attente",
          value: pending?.total ?? 0,
          className: "border-[#eb88b4] bg-[#9e1351]",
        },
        {
          label: "Approuvés",
          value: approved?.total ?? 0,
          className: "border-[#2262a2] bg-[#013e7b]",
        },
        {
          label: "Total",
          value: all?.total ?? 0,
          className: "border-[#dfdfdf] bg-white",
          labelClassName: "text-[#52525b]",
          valueClassName: "text-[#2f2f2f]",
        },
      ]}
    />
  )
}
