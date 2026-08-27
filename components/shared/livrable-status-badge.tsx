import type { LivrableStatus } from "@/hooks/deliverable/type"
import { cn } from "@/lib/utils"

const styles: Record<LivrableStatus, { label: string; className: string }> = {
  EN_PREPARATION: {
    label: "En préparation",
    className: "border-[#e4e4e7] bg-[#f4f4f5] text-[#52525b]",
  },
  DEPOSE: {
    label: "Déposé",
    className: "border-[#bfdbfe] bg-[#dbeafe] text-[#2563eb]",
  },
  SOUMIS: {
    label: "Soumis",
    className: "border-[#fee685] bg-[#fef3c7] text-[#e17100]",
  },
  VALIDE: {
    label: "Validé",
    className: "border-[#bbf7d0] bg-[#dcfce7] text-[#16a34a]",
  },
  REJETE: {
    label: "Rejeté",
    className: "border-[#fecaca] bg-[#fee2e2] text-[#dc2626]",
  },
}

export function LivrableStatusBadge({ status }: { status: LivrableStatus }) {
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
