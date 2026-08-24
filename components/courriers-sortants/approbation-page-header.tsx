import { PageHeader } from "@/components/shared/page-header"

export function ApprobationPageHeader() {
  return (
    <PageHeader
      title="Approbation courriers"
      subtitle="Courriers sortants en attente de validation"
      backHref="/"
      variant="success"
    />
  )
}
