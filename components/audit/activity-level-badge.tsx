import type { ActivityLevel } from "@/hooks/activity/type"
import { cn } from "@/lib/utils"

const styles: Record<ActivityLevel, { label: string; className: string }> = {
  info: {
    label: "Info",
    className: "border-[#e4e4e7] bg-[#f4f4f5] text-[#52525b]",
  },
  warn: {
    label: "Avertissement",
    className: "border-[#fee685] bg-[#fef3c7] text-[#e17100]",
  },
  error: {
    label: "Erreur",
    className: "border-[#fecaca] bg-[#fee2e2] text-[#dc2626]",
  },
}

export function ActivityLevelBadge({ level }: { level: ActivityLevel }) {
  const style = styles[level]

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
