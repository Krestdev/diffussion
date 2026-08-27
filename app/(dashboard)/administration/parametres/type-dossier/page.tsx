"use client"

import { SimpleReferentialPage } from "@/components/parametres/simple-referential-page"
import {
  useCreateDossierType,
  useDeleteDossierType,
  useDossierTypes,
  useUpdateDossierType,
} from "@/hooks/dossierType/useDossierType"

export default function Page() {
  return (
    <SimpleReferentialPage
      title="Type de dossier"
      subtitle="Gestion des types de dossiers"
      singularLabel="Type de dossier"
      emptyMessage="Aucun type de dossier"
      useList={useDossierTypes}
      useCreate={useCreateDossierType}
      useUpdate={useUpdateDossierType}
      useDelete={useDeleteDossierType}
    />
  )
}
