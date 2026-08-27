import { PageHeader } from "@/components/shared/page-header"

export function FolderFormHeader({
  mode,
  dossierId,
}: {
  mode: "create" | "edit"
  dossierId?: string
}) {
  return (
    <PageHeader
      variant="secondary"
      backHref={mode === "edit" && dossierId ? `/dossiers/${dossierId}` : "/dossiers"}
      title={mode === "edit" ? "Modifier un dossier" : "Créer un dossier"}
      subtitle={
        mode === "edit"
          ? "Mettre à jour les informations relatives à un dossier"
          : "Complétez le formulaire pour créer un nouveau dossier"
      }
    />
  )
}
