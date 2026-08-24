import type { RequestPriority } from "@/components/requetes/types"
import { cn } from "@/lib/utils"

const styles: Record<RequestPriority, { label: string; className: string }> = {
  urgent: {
    label: "Urgent",
    className: "border-[#fecaca] bg-[#fee2e2] text-[#dc2626]",
  },
  normal: {
    label: "Normal",
    className: "border-[#e4e4e7] bg-[#f4f4f5] text-[#52525b]",
  },
  faible: {
    label: "Faible",
    className: "border-[#bbf7d0] bg-[#dcfce7] text-[#16a34a]",
  },
}

export function PriorityBadge({ priority }: { priority: RequestPriority }) {
  const style = styles[priority]

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
