import Link from "next/link"

import { PageHeader } from "@/components/shared/page-header"

export function FoldersPageHeader() {
  return (
    <PageHeader
      title="Dossiers"
      subtitle="Consultez la liste des dossiers enregistrés"
      backHref="/"
      action={
        <Link
          href="/dossiers/nouveau"
          className="flex h-11 w-fit items-center justify-center rounded-lg bg-white px-5 text-base font-medium text-[#2f2f2f]"
        >
          Créer un dossier
        </Link>
      }
    />
  )
}
