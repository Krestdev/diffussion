import { PageHeader } from "@/components/shared/page-header"

export function AuditPageHeader() {
  return (
    <PageHeader
      title="Journal d’audit"
      subtitle="Inspecter le rapport d’activité de l’application"
      backHref="/"
    />
  )
}
