import type { SiteStatus } from "@/hooks/site/type"
import { cn } from "@/lib/utils"

const styles: Record<SiteStatus, { label: string; className: string }> = {
  ACTIVE: {
    label: "Actif",
    className: "border-[#bbf7d0] bg-[#dcfce7] text-[#16a34a]",
  },
  INACTIVE: {
    label: "Inactif",
    className: "border-[#e4e4e7] bg-[#f4f4f5] text-[#52525b]",
  },
}

export function SiteStatusBadge({ status }: { status: SiteStatus }) {
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
