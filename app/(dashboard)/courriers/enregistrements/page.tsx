"use client"

import { PageHeader } from "@/components/shared/page-header"
import { MailRegisterTable } from "@/components/courriers/mail-register-table"
import { useCourriers } from "@/hooks/courrier/useCourrier"

// The mail registry (registre du courrier): every courrier as it gets
// registered, both directions together in a single chronological log —
// distinct from the direction-scoped "Courriers entrants"/"Courriers
// sortants" lists.
export default function Page() {
  const { data, isLoading } = useCourriers({ take: 100 })

  return (
    <>
      <PageHeader
        title="Enregistrements"
        subtitle="Registre chronologique de tous les courriers, entrants et sortants"
        backHref="/"
      />
      <MailRegisterTable
        courriers={data?.data ?? []}
        isLoading={isLoading}
        emptyMessage="Aucun courrier enregistré"
      />
    </>
  )
}
