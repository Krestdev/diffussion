import type { CorrespondentStatus } from "@/hooks/correspondent/type"
import { cn } from "@/lib/utils"

const styles: Record<CorrespondentStatus, { label: string; className: string }> = {
  ACTIVE: {
    label: "Actif",
    className: "border-[#bbf7d0] bg-[#dcfce7] text-[#16a34a]",
  },
  INACTIVE: {
    label: "Inactif",
    className: "border-[#e4e4e7] bg-[#f4f4f5] text-[#52525b]",
  },
}

export function CorrespondentStatusBadge({
  status,
}: {
  status: CorrespondentStatus
}) {
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
