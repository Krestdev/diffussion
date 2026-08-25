import { PageHeader } from "@/components/shared/page-header"

export function SiteFormHeader() {
  return (
    <PageHeader
      variant="secondary"
      backHref="/administration/sites"
      title="Créer un site"
      subtitle="Complétez le formulaire pour créer un nouveau site"
    />
  )
}
