import { PageHeader } from "@/components/shared/page-header"

export function RoleFormHeader() {
  return (
    <PageHeader
      variant="secondary"
      backHref="/administration/roles"
      title="Créer un rôle"
      subtitle="Complétez le formulaire pour créer un rôle"
    />
  )
}
