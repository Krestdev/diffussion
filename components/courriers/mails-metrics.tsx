"use client"

import { SummaryMetrics } from "@/components/shared/summary-metrics"
import { useCourriers } from "@/hooks/courrier/useCourrier"

export function MailsMetrics() {
  const { data: all } = useCourriers({ direction: "ENTRANT", take: 1 })
  const { data: archived } = useCourriers({
    direction: "ENTRANT",
    status: "ARCHIVE",
    take: 1,
  })

  return (
    <SummaryMetrics
      metrics={[
        {
          label: "Courriers",
          value: all?.total ?? 0,
          className: "border-[#eb88b4] bg-[#9e1351]",
        },
        {
          label: "Archivés",
          value: archived?.total ?? 0,
          className: "border-[#2262a2] bg-[#013e7b]",
        },
      ]}
    />
  )
}
