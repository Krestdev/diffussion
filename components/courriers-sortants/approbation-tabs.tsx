"use client"

import { useCircuitInstances } from "@/hooks/circuitInstance/useCircuitInstance"

/**
 * Status filter for the Approbation queue. Shows the real pending count;
 * "Acceptés"/"Rejetés" stay presentational since this page is scoped to the
 * pending queue (see components/shared/list-toolbar.tsx for the rest of
 * this page's non-functional search/filter controls).
 */
export function ApprobationTabs() {
  const { data: instances } = useCircuitInstances({ status: "IN_PROGRESS" })
  const pending = instances?.length ?? 0

  return (
    <div className="flex w-fit items-center overflow-hidden rounded border border-[#dfdfdf] bg-white">
      <div className="flex min-h-9 items-center gap-2 bg-[#ffaf06] px-4 py-1">
        <span className="text-sm font-semibold text-[#2f2f2f]">En attente</span>
        <span className="flex min-w-[22px] items-center justify-center rounded bg-white p-1 text-xs font-semibold text-[#2f2f2f]">
          {pending}
        </span>
      </div>
      <div className="flex min-h-9 items-center px-4 py-1">
        <span className="text-sm text-[#2f2f2f]">Acceptés</span>
      </div>
      <div className="flex min-h-9 items-center px-4 py-1">
        <span className="text-sm text-[#2f2f2f]">Rejetés</span>
      </div>
    </div>
  )
}
