import { SummaryMetrics } from "@/components/shared/summary-metrics"

export function TasksMetrics({
  inProgress,
  completed,
}: {
  inProgress: number
  completed: number
}) {
  return (
    <SummaryMetrics
      metrics={[
        {
          label: "En cours",
          value: inProgress,
          className: "border-[#bbf7d0] bg-[#15803d]",
        },
        {
          label: "Terminées",
          value: completed,
          className: "border-[#eb88b4] bg-[#9e1351]",
        },
      ]}
    />
  )
}
