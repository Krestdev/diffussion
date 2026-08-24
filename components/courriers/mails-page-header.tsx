import Link from "next/link"

import { PageHeader } from "@/components/shared/page-header"

export function MailsPageHeader() {
  return (
    <PageHeader
      title="Courriers entrants"
      subtitle="Consultez la liste des courriers entrants"
      backHref="/"
      action={
        <Link
          href="/courriers/entrants/nouveau"
          className="flex h-11 w-fit items-center justify-center rounded-lg bg-white px-5 text-base font-medium text-[#2f2f2f]"
        >
          Enregistrer un courrier
        </Link>
      }
    />
  )
}
