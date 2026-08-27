import type { CourrierStatus } from "@/hooks/courrier/type"
import { cn } from "@/lib/utils"

const styles: Record<CourrierStatus, { label: string; className: string }> = {
  RECU: { label: "Reçu", className: "border-[#e4e4e7] bg-[#f4f4f5] text-[#52525b]" },
  ENREGISTRE: { label: "Enregistré", className: "border-[#bfdbfe] bg-[#dbeafe] text-[#2563eb]" },
  TRANSMIS: { label: "Transmis", className: "border-[#bfdbfe] bg-[#dbeafe] text-[#2563eb]" },
  EN_TRAITEMENT: { label: "En traitement", className: "border-[#fde68a] bg-[#fef3c7] text-[#b45309]" },
  EN_ATTENTE: { label: "En attente", className: "border-[#fde68a] bg-[#fef3c7] text-[#b45309]" },
  BROUILLON: { label: "Brouillon", className: "border-[#e4e4e7] bg-[#f4f4f5] text-[#52525b]" },
  EN_VERIFICATION: { label: "En vérification", className: "border-[#fde68a] bg-[#fef3c7] text-[#b45309]" },
  A_CORRIGER: { label: "À corriger", className: "border-[#fecaca] bg-[#fee2e2] text-[#dc2626]" },
  EN_VALIDATION: { label: "En validation", className: "border-[#fde68a] bg-[#fef3c7] text-[#b45309]" },
  VALIDE: { label: "Validé", className: "border-[#bbf7d0] bg-[#dcfce7] text-[#16a34a]" },
  PRET_A_ENVOYER: { label: "Prêt à envoyer", className: "border-[#bbf7d0] bg-[#dcfce7] text-[#16a34a]" },
  ENVOYE: { label: "Envoyé", className: "border-[#bbf7d0] bg-[#dcfce7] text-[#16a34a]" },
  ANNULE: { label: "Annulé", className: "border-[#fecaca] bg-[#fee2e2] text-[#dc2626]" },
  CLOTURE: { label: "Clôturé", className: "border-[#e4e4e7] bg-[#f4f4f5] text-[#52525b]" },
  ARCHIVE: { label: "Archivé", className: "border-[#e4e4e7] bg-[#f4f4f5] text-[#71717a]" },
}

export function CourrierStatusBadge({ status }: { status: CourrierStatus }) {
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
