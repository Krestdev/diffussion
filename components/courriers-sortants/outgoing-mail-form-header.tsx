import { PageHeader } from "@/components/shared/page-header"

export function OutgoingMailFormHeader({
  mode,
  courrierId,
}: {
  mode: "create" | "edit"
  courrierId?: string
}) {
  return (
    <PageHeader
      variant="secondary"
      backHref={
        mode === "edit" && courrierId
          ? `/courriers/sortants/${courrierId}`
          : "/courriers/sortants"
      }
      title={
        mode === "edit"
          ? "Modifier un courrier sortant"
          : "Créer un courrier sortant"
      }
      subtitle={
        mode === "edit"
          ? "Mettre à jour les informations relatives à un courrier sortant"
          : "Complétez le formulaire pour créer un courrier sortant"
      }
    />
  )
}
