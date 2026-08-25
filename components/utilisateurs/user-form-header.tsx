import { PageHeader } from "@/components/shared/page-header"

export function UserFormHeader() {
  return (
    <PageHeader
      variant="secondary"
      backHref="/administration/utilisateurs"
      title="Créer un utilisateur"
      subtitle="Complétez le formulaire pour enregistrer un nouvel un utilisateur"
    />
  )
}
