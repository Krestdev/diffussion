import { PageHeader } from "@/components/shared/page-header"

export function ApprobationPageHeader() {
  return (
    <PageHeader
      title="Approbation"
      subtitle="Courriers et documents en attente de validation"
      backHref="/"
      variant="success"
    />
  )
}
