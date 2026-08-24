import { SummaryMetrics } from "@/components/shared/summary-metrics"
import { approvalQueueMetrics } from "@/components/courriers-sortants/approbation-data"

export function ApprobationMetrics() {
  return (
    <SummaryMetrics
      metrics={[
        {
          label: "En attente",
          value: approvalQueueMetrics.pending,
          className: "border-[#eb88b4] bg-[#9e1351]",
        },
        {
          label: "Acceptés",
          value: approvalQueueMetrics.accepted,
          className: "border-[#bbf7d0] bg-[#15803d]",
        },
        {
          label: "Rejetés",
          value: approvalQueueMetrics.rejected,
          className: "border-[#dfdfdf] bg-white",
          labelClassName: "text-[#52525b]",
          valueClassName: "text-[#2f2f2f]",
        },
      ]}
    />
  )
}
