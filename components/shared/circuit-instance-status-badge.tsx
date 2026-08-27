import type { CircuitInstanceStatus } from "@/hooks/circuitInstance/type"
import { cn } from "@/lib/utils"

const styles: Record<CircuitInstanceStatus, { label: string; className: string }> = {
  IN_PROGRESS: {
    label: "En cours",
    className: "border-[#fde68a] bg-[#fef3c7] text-[#b45309]",
  },
  COMPLETED: {
    label: "Terminé",
    className: "border-[#bbf7d0] bg-[#dcfce7] text-[#16a34a]",
  },
  CANCELLED: {
    label: "Annulé",
    className: "border-[#fecaca] bg-[#fee2e2] text-[#dc2626]",
  },
}

export function CircuitInstanceStatusBadge({
  status,
  className,
}: {
  status: CircuitInstanceStatus
  className?: string
}) {
  const style = styles[status]

  return (
    <span
      className={cn(
        "inline-flex h-[22px] items-center rounded-md border px-2 py-0.5 text-sm font-medium",
        style.className,
        className
      )}
    >
      {style.label}
    </span>
  )
}
