import type { ReactNode } from "react"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Metric = {
  label: string
  value: number
  footnote: ReactNode
  className: string
  labelClassName: string
  valueClassName: string
  dividerClassName: string
}

const metrics: Metric[] = [
  {
    label: "Tâches à faire",
    value: 27,
    footnote: (
      <>
        Complétées <span className="text-white">: 325</span>
      </>
    ),
    className: "border-[#eb88b4] bg-[#9e1351]",
    labelClassName: "text-[#e4e4e7]",
    valueClassName: "text-white",
    dividerClassName: "bg-[#e4e4e7]/30",
  },
  {
    label: "Total courriers reçus",
    value: 221,
    footnote: "Archivés : 213",
    className: "border-[#2262a2] bg-[#013e7b]",
    labelClassName: "text-[#e4e4e7]",
    valueClassName: "text-white",
    dividerClassName: "bg-[#e4e4e7]/30",
  },
  {
    label: "Courrier",
    value: 26,
    footnote: (
      <>
        En attente d’approbation <span className="text-[#18181b]">: 35</span>
      </>
    ),
    className: "border-[#dfdfdf] bg-white",
    labelClassName: "text-[#52525b]",
    valueClassName: "text-[#2f2f2f]",
    dividerClassName: "bg-[#dfdfdf]",
  },
]

export function MetricCards() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      {metrics.map((metric) => (
        <Card
          key={metric.label}
          className={cn(
            "gap-1.5 rounded-xl border p-4 shadow-[0px_8px_6px_-6px_rgba(0,0,0,0.1)]",
            metric.className
          )}
        >
          <p className={cn("text-xs font-medium", metric.labelClassName)}>
            {metric.label}
          </p>
          <p className={cn("text-3xl font-medium", metric.valueClassName)}>
            {metric.value}
          </p>
          <div className={cn("h-px w-full", metric.dividerClassName)} />
          <p className={cn("text-xs text-[#a1a1aa]")}>{metric.footnote}</p>
        </Card>
      ))}
    </div>
  )
}
