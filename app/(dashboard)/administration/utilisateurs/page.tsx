import { UtilisateursPageHeader } from "@/components/utilisateurs/utilisateurs-page-header"
import { UtilisateursTable } from "@/components/utilisateurs/utilisateurs-table"
import { ListPagination } from "@/components/shared/list-pagination"
import { ListToolbar } from "@/components/shared/list-toolbar"

export default function Page() {
  return (
    <>
      <UtilisateursPageHeader />
      <ListToolbar />
      <UtilisateursTable />
      <ListPagination total={64} page={1} pageCount={5} />
    </>
  )
}
