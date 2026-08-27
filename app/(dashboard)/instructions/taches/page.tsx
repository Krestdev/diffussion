"use client"

import { useMemo, useState } from "react"

import { ListPagination } from "@/components/shared/list-pagination"
import { ListToolbar } from "@/components/shared/list-toolbar"
import { TasksMetrics } from "@/components/taches/tasks-metrics"
import { TasksPageHeader } from "@/components/taches/tasks-page-header"
import { TasksTable } from "@/components/taches/tasks-table"
import { TasksTabs } from "@/components/taches/tasks-tabs"
import { useCurrentUser } from "@/hooks/auth/useAuth"
import { useInstructions } from "@/hooks/instruction/useInstruction"
import type { InstructionStatus } from "@/hooks/instruction/type"

// Requêtes owns the pre-decision statuses — Tâches only shows instructions
// that have already been accepted at least once.
const TASK_STATUSES: InstructionStatus[] = [
  "EN_COURS",
  "EN_ATTENTE_VALIDATION",
  "A_CORRIGER",
  "TERMINEE",
]

export default function Page() {
  const [tab, setTab] = useState<"en-cours" | "terminees">("en-cours")
  const { data: me } = useCurrentUser()
  const { data, isLoading } = useInstructions({ assigneeId: me?.id, take: 100 })

  const myTasks = useMemo(
    () => (data?.data ?? []).filter((i) => TASK_STATUSES.includes(i.status)),
    [data]
  )
  const inProgress = useMemo(
    () => myTasks.filter((t) => t.status !== "TERMINEE"),
    [myTasks]
  )
  const completed = useMemo(
    () => myTasks.filter((t) => t.status === "TERMINEE"),
    [myTasks]
  )
  const visible = tab === "en-cours" ? inProgress : completed

  return (
    <>
      <TasksPageHeader />
      <TasksMetrics inProgress={inProgress.length} completed={completed.length} />
      <TasksTabs value={tab} onChange={setTab} inProgressCount={inProgress.length} />
      <ListToolbar />
      <TasksTable tasks={visible} isLoading={isLoading} />
      <ListPagination total={visible.length} page={1} pageCount={1} />
    </>
  )
}
