import Link from "next/link"

import { PageHeader } from "@/components/shared/page-header"

export function SitesPageHeader() {
  return (
    <PageHeader
      title="Sites"
      subtitle="Gestions des sites de l’entreprise"
      backHref="/"
      action={
        <Link
          href="/administration/sites/nouveau"
          className="flex h-11 w-fit items-center justify-center rounded-lg bg-white px-5 text-base font-medium text-[#2f2f2f]"
        >
          Créer un site
        </Link>
      }
    />
  )
}
