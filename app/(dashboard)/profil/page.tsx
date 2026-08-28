"use client"

import {
  Briefcase,
  Building2,
  Calendar,
  Hash,
  Mail,
  Phone,
  ShieldCheck,
  User,
  type LucideIcon,
} from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { useCurrentUser } from "@/hooks/auth/useAuth"

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="flex gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f4f4f5]">
        <Icon className="size-6 text-[#52525b]" />
      </div>
      <div>
        <p className="text-sm text-[#52525b]">{label}</p>
        <div className="text-sm font-medium text-[#18181b]">{value}</div>
      </div>
    </div>
  )
}

// Read-only for now — there's no self-service "update my profile" endpoint
// yet (GET /auth/me only). Changing name/phone/function still goes through
// an admin via Administration > Utilisateurs.
export default function Page() {
  const { data: user, isLoading } = useCurrentUser()

  if (isLoading || !user) {
    return <p className="text-sm text-[#71717a]">Chargement…</p>
  }

  return (
    <>
      <PageHeader title={user.name} subtitle="Mon profil" backHref="/" />

      <div className="grid grid-cols-2 gap-x-6 gap-y-4 rounded-xl border border-[#dfdfdf] p-4">
        <InfoRow icon={Mail} label="Email" value={user.email} />
        <InfoRow icon={Phone} label="Téléphone" value={user.phone ?? "—"} />
        <InfoRow icon={Briefcase} label="Fonction" value={user.function ?? "—"} />
        <InfoRow
          icon={Hash}
          label="Matricule"
          value={user.registrationNumber ?? "—"}
        />
        <InfoRow
          icon={ShieldCheck}
          label="Rôles"
          value={user.roles.length > 0 ? user.roles.join(", ") : "—"}
        />
        <InfoRow
          icon={Building2}
          label="Sites"
          value={
            user.sites.length > 0
              ? user.sites.map((site) => site.name).join(", ")
              : "—"
          }
        />
        <InfoRow
          icon={User}
          label="Statut"
          value={user.status === "ACTIVE" ? "Actif" : "Suspendu"}
        />
        <InfoRow
          icon={Calendar}
          label="Dernière connexion"
          value={
            user.lastLogin
              ? new Date(user.lastLogin).toLocaleString("fr-FR")
              : "—"
          }
        />
      </div>
    </>
  )
}
