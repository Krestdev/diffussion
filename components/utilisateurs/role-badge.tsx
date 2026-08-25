import { cn } from "@/lib/utils"

const styles: Record<string, string> = {
  Administrateur: "bg-[#f3e8ff] text-[#7e22ce]",
  Exécutant: "bg-[#f2cfde] text-[#9e1351]",
  Dispatcheur: "bg-[#dbeafe] text-[#2563eb]",
  Validateur: "bg-[#dcfce7] text-[#16a34a]",
  Rédacteur: "bg-[#fef3c7] text-[#b45309]",
}

const fallback = "bg-[#e4e4e7] text-[#52525b]"

export function RoleBadge({ role }: { role: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-[22px] items-center rounded px-1.5 py-0.5 text-sm font-medium",
        styles[role] ?? fallback
      )}
    >
      {role}
    </span>
  )
}
