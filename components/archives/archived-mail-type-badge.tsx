import type { CourrierDirection } from "@/hooks/courrier/type"
import { cn } from "@/lib/utils"

const styles: Record<CourrierDirection, { label: string; className: string }> = {
  ENTRANT: {
    label: "Entrant",
    className: "border-[#bbf7d0] bg-[#dcfce7] text-[#16a34a]",
  },
  SORTANT: {
    label: "Sortant",
    className: "border-[#bfdbfe] bg-[#dbeafe] text-[#2563eb]",
  },
}

export function ArchivedMailTypeBadge({ type }: { type: CourrierDirection }) {
  const style = styles[type]

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
