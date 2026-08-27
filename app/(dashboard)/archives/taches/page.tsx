"use client"

import { ArchivedTasksPageHeader } from "@/components/archives/archived-tasks-page-header"
import { ArchivedTasksTable } from "@/components/archives/archived-tasks-table"
import { ListPagination } from "@/components/shared/list-pagination"
import { ListToolbar } from "@/components/shared/list-toolbar"
import { useInstructions } from "@/hooks/instruction/useInstruction"

export default function Page() {
  const { data } = useInstructions({ status: "TERMINEE" })

  return (
    <>
      <ArchivedTasksPageHeader />
      <ListToolbar />
      <ArchivedTasksTable />
      <ListPagination total={data?.total ?? 0} page={1} pageCount={1} />
    </>
  )
}
