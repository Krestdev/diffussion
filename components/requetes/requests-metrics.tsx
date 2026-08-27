import { SummaryMetrics } from "@/components/shared/summary-metrics"

export function RequestsMetrics({
  accepted,
  rejected,
}: {
  accepted: number
  rejected: number
}) {
  return (
    <SummaryMetrics
      metrics={[
        {
          label: "Acceptés",
          value: accepted,
          className: "border-[#bbf7d0] bg-[#15803d]",
        },
        {
          label: "Rejetés",
          value: rejected,
          className: "border-[#eb88b4] bg-[#9e1351]",
        },
      ]}
    />
  )
}
