"use client"

import { ListChecks } from "lucide-react"

import { PriorityBadge } from "@/components/shared/priority-badge"
import { toBadgePriority } from "@/lib/priority"
import { useInstructions } from "@/hooks/instruction/useInstruction"
import type { Instruction } from "@/hooks/instruction/type"

function progress(instruction: Instruction) {
  const total = instruction.livrables.length
  if (total === 0) return null
  const validated = instruction.livrables.filter((l) => l.status === "VALIDE").length
  return { validated, total }
}

/** Tasks (Instructions) created from a given courrier — assignees and
 * completion progress, derived from their livrables. */
export function InstructionTasksPanel({ courrierId }: { courrierId: string }) {
  const { data, isLoading } = useInstructions({ courrierId, take: 50 })
  const tasks = data?.data ?? []

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-[#dfdfdf] p-4">
      <div className="flex items-center gap-2">
        <ListChecks className="size-5 text-[#52525b]" />
        <p className="text-base font-semibold text-[#18181b]">Tâches</p>
      </div>
      {isLoading && <p className="text-sm text-[#71717a]">Chargement…</p>}
      {!isLoading && tasks.length === 0 && (
        <p className="text-sm text-[#71717a]">
          Aucune tâche créée à partir de ce courrier.
        </p>
      )}
      {tasks.length > 0 && (
        <ul className="flex flex-col gap-2">
          {tasks.map((task) => {
            const progressInfo = progress(task)
            return (
              <li
                key={task.id}
                className="flex flex-col gap-1.5 rounded-lg border border-[#f4f4f5] p-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-[#18181b]">
                    {task.title}
                  </p>
                  <PriorityBadge priority={toBadgePriority(task.priority)} />
                </div>
                <p className="text-xs text-[#71717a]">
                  {task.assignees.length > 0
                    ? task.assignees.map((a) => a.user.name).join(", ")
                    : "Non assignée"}
                </p>
                {progressInfo && (
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 rounded-full bg-[#f4f4f5]">
                      <div
                        className="h-1.5 rounded-full bg-[#700032]"
                        style={{
                          width: `${(progressInfo.validated / progressInfo.total) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-[#71717a]">
                      {progressInfo.validated}/{progressInfo.total}
                    </span>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
