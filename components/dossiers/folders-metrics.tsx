import { SummaryMetrics } from "@/components/shared/summary-metrics"
import { folderMetrics } from "@/components/dossiers/data"

export function FoldersMetrics() {
  return (
    <SummaryMetrics
      metrics={[
        {
          label: "Dossiers",
          value: folderMetrics.total,
          className: "border-[#eb88b4] bg-[#9e1351]",
        },
        {
          label: "Archivés",
          value: folderMetrics.archived,
          className: "border-[#2262a2] bg-[#013e7b]",
        },
      ]}
    />
  )
}
