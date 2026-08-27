"use client"

import { SummaryMetrics } from "@/components/shared/summary-metrics"
import { useDossiers } from "@/hooks/dossier/useDossier"

export function FoldersMetrics() {
  const { data: all } = useDossiers({ take: 1 })
  const { data: archived } = useDossiers({ status: "ARCHIVED", take: 1 })

  return (
    <SummaryMetrics
      metrics={[
        {
          label: "Dossiers",
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
