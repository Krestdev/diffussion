/**
 * Status filter for the Approbation queue. Presentational only, matching
 * the rest of this list page (search/filter controls are non-functional
 * mockups) — see components/shared/list-toolbar.tsx.
 */
export function ApprobationTabs() {
  return (
    <div className="flex w-fit items-center overflow-hidden rounded border border-[#dfdfdf] bg-white">
      <div className="flex min-h-9 items-center gap-2 bg-[#ffaf06] px-4 py-1">
        <span className="text-sm font-semibold text-[#2f2f2f]">En attente</span>
        <span className="flex min-w-[22px] items-center justify-center rounded bg-white p-1 text-xs font-semibold text-[#2f2f2f]">
          9
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
