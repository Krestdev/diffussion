import { FolderForm } from "@/components/dossiers/folder-form"
import { FolderFormHeader } from "@/components/dossiers/folder-form-header"

export default function Page() {
  return (
    <>
      <FolderFormHeader mode="create" />
      <FolderForm mode="create" />
    </>
  )
}
