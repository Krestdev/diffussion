import type { AppUserStatus } from "@/hooks/adminUser/type"
import { cn } from "@/lib/utils"

const styles: Record<AppUserStatus, { label: string; className: string }> = {
  ACTIVE: {
    label: "Actif",
    className: "border-[#bbf7d0] bg-[#dcfce7] text-[#16a34a]",
  },
  SUSPENDED: {
    label: "Suspendu",
    className: "border-[#fecaca] bg-[#fee2e2] text-[#dc2626]",
  },
}

export function StatusBadge({ status }: { status: AppUserStatus }) {
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
