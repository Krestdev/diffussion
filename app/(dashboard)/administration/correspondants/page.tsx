import { CorrespondentsPageHeader } from "@/components/correspondants/correspondents-page-header"
import { CorrespondentsTable } from "@/components/correspondants/correspondents-table"
import { ListPagination } from "@/components/shared/list-pagination"
import { ListToolbar } from "@/components/shared/list-toolbar"

export default function Page() {
  return (
    <>
      <CorrespondentsPageHeader />
      <ListToolbar />
      <CorrespondentsTable />
      <ListPagination total={94} page={1} pageCount={7} />
    </>
  )
}
