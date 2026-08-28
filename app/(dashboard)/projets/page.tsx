"use client"

import { SimpleReferentialPage } from "@/components/parametres/simple-referential-page"
import {
  useCreateProject,
  useDeleteProject,
  useProjects,
  useUpdateProject,
} from "@/hooks/project/useProject"

export default function Page() {
  return (
    <SimpleReferentialPage
      title="Projets"
      subtitle="Gestion des projets"
      singularLabel="Projet"
      emptyMessage="Aucun projet"
      useList={useProjects}
      useCreate={useCreateProject}
      useUpdate={useUpdateProject}
      useDelete={useDeleteProject}
    />
  )
}
