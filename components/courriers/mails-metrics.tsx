import { SummaryMetrics } from "@/components/shared/summary-metrics"
import { mailMetrics } from "@/components/courriers/data"

export function MailsMetrics() {
  return (
    <SummaryMetrics
      metrics={[
        {
          label: "Courriers",
          value: mailMetrics.total,
          className: "border-[#eb88b4] bg-[#9e1351]",
        },
        {
          label: "Archivés",
          value: mailMetrics.archived,
          className: "border-[#2262a2] bg-[#013e7b]",
        },
      ]}
    />
  )
}
