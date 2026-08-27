import type { DossierStatus } from "@/hooks/dossier/type"
import { cn } from "@/lib/utils"

const styles: Record<DossierStatus, { label: string; className: string }> = {
  OPEN: {
    label: "Ouvert",
    className: "border-[#bbf7d0] bg-[#dcfce7] text-[#16a34a]",
  },
  IN_PROGRESS: {
    label: "En cours",
    className: "border-[#bfdbfe] bg-[#dbeafe] text-[#2563eb]",
  },
  PENDING: {
    label: "En attente",
    className: "border-[#fde68a] bg-[#fef3c7] text-[#b45309]",
  },
  LATE: {
    label: "En retard",
    className: "border-[#fecaca] bg-[#fee2e2] text-[#dc2626]",
  },
  CLOSED: {
    label: "Clôturé",
    className: "border-[#e4e4e7] bg-[#f4f4f5] text-[#52525b]",
  },
  ARCHIVED: {
    label: "Archivé",
    className: "border-[#e4e4e7] bg-[#f4f4f5] text-[#71717a]",
  },
}

export function FolderStatusBadge({ status }: { status: DossierStatus }) {
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
