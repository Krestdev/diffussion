import { PageHeader } from "@/components/shared/page-header"

export function CategoriesPageHeader() {
  return (
    <PageHeader
      title="Catégories de documents"
      subtitle="Gestion des catégories associées aux documents"
      backHref="/administration/parametres"
      variant="secondary"
    />
  )
}
