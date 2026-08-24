import type { TaskPriority } from "@/components/taches/types"
import { cn } from "@/lib/utils"

const styles: Record<TaskPriority, { label: string; className: string }> = {
  urgent: {
    label: "Urgent",
    className: "border-[#fecaca] bg-[#fee2e2] text-[#dc2626]",
  },
  normal: {
    label: "Normal",
    className: "border-[#e4e4e7] bg-[#f4f4f5] text-[#52525b]",
  },
  moyen: {
    label: "Moyen",
    className: "border-[#fee685] bg-[#fef3c7] text-[#e17100]",
  },
}

export function PriorityBadge({ priority }: { priority: TaskPriority }) {
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
