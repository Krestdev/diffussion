import { ListPagination } from "@/components/shared/list-pagination"
import { ListToolbar } from "@/components/shared/list-toolbar"
import { TasksMetrics } from "@/components/taches/tasks-metrics"
import { TasksPageHeader } from "@/components/taches/tasks-page-header"
import { TasksTable } from "@/components/taches/tasks-table"
import { TasksTabs } from "@/components/taches/tasks-tabs"

export default function Page() {
  return (
    <>
      <TasksPageHeader />
      <TasksMetrics />
      <TasksTabs />
      <ListToolbar />
      <TasksTable />
      <ListPagination total={6} page={1} pageCount={2} />
    </>
  )
}
