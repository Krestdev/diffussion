import { PageHeader } from "@/components/shared/page-header"

export function CircuitsPageHeader() {
  return (
    <PageHeader
      title="Circuits de validation"
      subtitle="Gestion des circuits de validation des courriers"
      backHref="/administration/parametres"
      variant="secondary"
    />
  )
}
