import { SummaryMetrics } from "@/components/shared/summary-metrics"
import { requestMetrics } from "@/components/requetes/data"

export function RequestsMetrics() {
  return (
    <SummaryMetrics
      metrics={[
        {
          label: "Acceptés",
          value: requestMetrics.accepted,
          className: "border-[#bbf7d0] bg-[#15803d]",
        },
        {
          label: "Rejetés",
          value: requestMetrics.rejected,
          className: "border-[#eb88b4] bg-[#9e1351]",
        },
      ]}
    />
  )
}
