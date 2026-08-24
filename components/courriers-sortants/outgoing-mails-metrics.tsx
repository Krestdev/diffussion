import { SummaryMetrics } from "@/components/shared/summary-metrics"
import { outgoingMailMetrics } from "@/components/courriers-sortants/data"

export function OutgoingMailsMetrics() {
  return (
    <SummaryMetrics
      metrics={[
        {
          label: "En attente",
          value: outgoingMailMetrics.pending,
          className: "border-[#eb88b4] bg-[#9e1351]",
        },
        {
          label: "Approuvés",
          value: outgoingMailMetrics.approved,
          className: "border-[#2262a2] bg-[#013e7b]",
        },
        {
          label: "Total",
          value: outgoingMailMetrics.total,
          className: "border-[#dfdfdf] bg-white",
          labelClassName: "text-[#52525b]",
          valueClassName: "text-[#2f2f2f]",
        },
      ]}
    />
  )
}
