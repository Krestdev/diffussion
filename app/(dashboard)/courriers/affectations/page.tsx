"use client"

import { PageHeader } from "@/components/shared/page-header"
import { MailRegisterTable } from "@/components/courriers/mail-register-table"
import { useCurrentUser } from "@/hooks/auth/useAuth"
import { useCourriers } from "@/hooks/courrier/useCourrier"

// Courriers whose circuit owner (10.6) is the signed-in user — a personal
// queue distinct from the Approbation inbox (pending circuit steps) and
// from the dossier-wide "Contenu" listing.
export default function Page() {
  const { data: me } = useCurrentUser()
  const { data, isLoading } = useCourriers({ ownerId: me?.id, take: 100 })

  return (
    <>
      <PageHeader
        title="Affectations"
        subtitle="Courriers dont vous êtes le propriétaire"
        backHref="/"
      />
      <MailRegisterTable
        courriers={data?.data ?? []}
        isLoading={isLoading || !me}
        emptyMessage="Aucun courrier ne vous est affecté"
      />
    </>
  )
}
