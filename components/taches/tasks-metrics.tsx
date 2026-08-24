import { SummaryMetrics } from "@/components/shared/summary-metrics"
import { taskMetrics } from "@/components/taches/data"

export function TasksMetrics() {
  return (
    <SummaryMetrics
      metrics={[
        {
          label: "En cours",
          value: taskMetrics.inProgress,
          className: "border-[#bbf7d0] bg-[#15803d]",
        },
        {
          label: "Terminées",
          value: taskMetrics.completed,
          className: "border-[#eb88b4] bg-[#9e1351]",
        },
      ]}
    />
  )
}
