import { Hourglass, type LucideIcon } from "lucide-react"

import type { RequestStatus } from "@/components/requetes/types"
import { cn } from "@/lib/utils"

const styles: Record<
  RequestStatus,
  { label: string; icon?: LucideIcon; className: string }
> = {
  "en-attente": {
    label: "En attente",
    icon: Hourglass,
    className: "border-[#fee685] bg-[#fef3c7] text-[#e17100]",
  },
  accepte: {
    label: "Accepté",
    className: "border-[#bbf7d0] bg-[#dcfce7] text-[#16a34a]",
  },
  rejete: {
    label: "Rejeté",
    className: "border-[#fecaca] bg-[#fee2e2] text-[#dc2626]",
  },
}

export function StatusBadge({
  status,
  showIcon = false,
}: {
  status: RequestStatus
  showIcon?: boolean
}) {
  const style = styles[status]
  const Icon = style.icon

  return (
    <span
      className={cn(
        "inline-flex h-[22px] items-center gap-1 rounded-md border px-2 py-0.5 text-sm font-medium",
        style.className
      )}
    >
      {showIcon && Icon && <Icon className="size-3.5" />}
      {style.label}
    </span>
  )
}
