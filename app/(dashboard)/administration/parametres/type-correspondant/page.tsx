"use client"

import { SimpleReferentialPage } from "@/components/parametres/simple-referential-page"
import {
  useCorrespondentTypes,
  useCreateCorrespondentType,
  useDeleteCorrespondentType,
  useUpdateCorrespondentType,
} from "@/hooks/correspondentType/useCorrespondentType"

export default function Page() {
  return (
    <SimpleReferentialPage
      title="Type de correspondant"
      subtitle="Gestion des types de correspondant"
      singularLabel="Type de correspondant"
      emptyMessage="Aucun type de correspondant"
      useList={useCorrespondentTypes}
      useCreate={useCreateCorrespondentType}
      useUpdate={useUpdateCorrespondentType}
      useDelete={useDeleteCorrespondentType}
    />
  )
}
