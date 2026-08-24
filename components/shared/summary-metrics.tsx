import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type SummaryMetric = {
  label: string
  value: number
  className: string
  labelClassName?: string
  valueClassName?: string
}

export function SummaryMetrics({ metrics }: { metrics: SummaryMetric[] }) {
  return (
    <div
      className={cn(
        "grid gap-5",
        metrics.length >= 3
          ? "grid-cols-2 sm:max-w-3xl sm:grid-cols-3"
          : "grid-cols-2 sm:max-w-md"
      )}
    >
      {metrics.map((metric) => (
        <Card
          key={metric.label}
          className={cn(
            "gap-1.5 rounded-xl border p-4 shadow-[0px_8px_6px_-6px_rgba(0,0,0,0.1)]",
            metric.className
          )}
        >
          <p className={cn("text-xs text-[#e4e4e7]", metric.labelClassName)}>
            {metric.label}
          </p>
          <p className={cn("text-3xl text-white", metric.valueClassName)}>
            {metric.value}
          </p>
        </Card>
      ))}
    </div>
  )
}
