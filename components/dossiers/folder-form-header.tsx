import { PageHeader } from "@/components/shared/page-header"

export function FolderFormHeader({ mode }: { mode: "create" | "edit" }) {
  return (
    <PageHeader
      variant="secondary"
      backHref="/dossiers"
      title={mode === "edit" ? "Modifier un dossier" : "Créer un dossier"}
      subtitle={
        mode === "edit"
          ? "Mettre à jour les informations relatives à un dossier"
          : "Complétez le formulaire pour créer un nouveau dossier"
      }
    />
  )
}
