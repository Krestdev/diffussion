import type { UserStatus } from "@/components/utilisateurs/types"
import { cn } from "@/lib/utils"

const styles: Record<UserStatus, { label: string; className: string }> = {
  actif: {
    label: "Actif",
    className: "border-[#bbf7d0] bg-[#dcfce7] text-[#16a34a]",
  },
  suspendu: {
    label: "Suspendu",
    className: "border-[#fecaca] bg-[#fee2e2] text-[#dc2626]",
  },
}

export function StatusBadge({ status }: { status: UserStatus }) {
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
