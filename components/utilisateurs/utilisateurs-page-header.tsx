import Link from "next/link"

import { PageHeader } from "@/components/shared/page-header"

export function UtilisateursPageHeader() {
  return (
    <PageHeader
      title="Utilisateurs"
      subtitle="Liste des utilisateurs enregistrés sur l’application"
      backHref="/"
      action={
        <Link
          href="/administration/utilisateurs/nouveau"
          className="flex h-11 w-fit items-center justify-center rounded-lg bg-white px-5 text-base font-medium text-[#2f2f2f]"
        >
          Créer un utilisateur
        </Link>
      }
    />
  )
}
