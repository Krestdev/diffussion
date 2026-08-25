import Link from "next/link"

import { PageHeader } from "@/components/shared/page-header"

export function RolesPageHeader() {
  return (
    <PageHeader
      title="Rôles et permissions"
      subtitle="Configurez les accès aux services de l’application"
      backHref="/"
      action={
        <Link
          href="/administration/roles/nouveau"
          className="flex h-11 w-fit items-center justify-center rounded-lg bg-white px-5 text-base font-medium text-[#2f2f2f]"
        >
          Créer un rôle
        </Link>
      }
    />
  )
}
