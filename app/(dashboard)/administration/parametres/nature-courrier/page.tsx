"use client"

import { SimpleReferentialPage } from "@/components/parametres/simple-referential-page"
import {
  useCourrierNatures,
  useCreateCourrierNature,
  useDeleteCourrierNature,
  useUpdateCourrierNature,
} from "@/hooks/courrierNature/useCourrierNature"

export default function Page() {
  return (
    <SimpleReferentialPage
      title="Nature de courrier"
      subtitle="Gestion des natures de courrier"
      singularLabel="Nature de courrier"
      emptyMessage="Aucune nature de courrier"
      useList={useCourrierNatures}
      useCreate={useCreateCourrierNature}
      useUpdate={useUpdateCourrierNature}
      useDelete={useDeleteCourrierNature}
    />
  )
}
