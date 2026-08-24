import { PageHeader } from "@/components/shared/page-header"

export function CorrespondentFormHeader() {
  return (
    <PageHeader
      variant="secondary"
      backHref="/administration/correspondants"
      title="Créer un correspondant"
      subtitle="Complétez le formulaire pour enregistrer un nouveau correspondant"
    />
  )
}
