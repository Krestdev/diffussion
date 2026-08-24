import type { OutgoingMailStatus } from "@/components/courriers-sortants/types"
import { cn } from "@/lib/utils"

const styles: Record<OutgoingMailStatus, { label: string; className: string }> =
  {
    pending: {
      label: "En attente",
      className: "border-[#fde68a] bg-[#fef3c7] text-[#b45309]",
    },
    approved: {
      label: "Approuvé",
      className: "border-[#bbf7d0] bg-[#dcfce7] text-[#16a34a]",
    },
    rejected: {
      label: "Rejeté",
      className: "border-[#fecaca] bg-[#fee2e2] text-[#dc2626]",
    },
  }

export function StatusBadge({ status }: { status: OutgoingMailStatus }) {
  const style = styles[status]

  return (
    <span
      className={cn(
        "inline-flex h-[22px] items-center rounded-md border px-2 py-0.5 text-sm font-medium",
        style.className
      )}
    >
      {style.label}
    </span>
  )
}
