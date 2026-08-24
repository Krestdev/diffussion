import Link from "next/link"

import { PageHeader } from "@/components/shared/page-header"

export function CorrespondentsPageHeader() {
  return (
    <PageHeader
      title="Correspondants"
      subtitle="Gestion des informations associées aux correspondants"
      backHref="/"
      action={
        <Link
          href="/administration/correspondants/nouveau"
          className="flex h-11 w-fit items-center justify-center rounded-lg bg-white px-5 text-base font-medium text-[#2f2f2f]"
        >
          Créer un correspondant
        </Link>
      }
    />
  )
}
