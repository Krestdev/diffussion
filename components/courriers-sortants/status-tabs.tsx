"use client"

import { statusGroupTabs, type OutgoingMailStatusGroup } from "@/components/courriers-sortants/status-groups"
import { cn } from "@/lib/utils"

export function StatusTabs({
  value,
  onChange,
  counts,
}: {
  value: OutgoingMailStatusGroup
  onChange: (status: OutgoingMailStatusGroup) => void
  counts?: Partial<Record<OutgoingMailStatusGroup, number>>
}) {
  return (
    <div className="flex w-fit items-center overflow-hidden rounded border border-[#dfdfdf] bg-white">
      {statusGroupTabs.map((tab) => {
        const isActive = tab.value === value
        const count = counts?.[tab.value]

        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className={cn(
              "flex min-h-9 items-center gap-2 px-4 py-1 text-sm",
              isActive
                ? "bg-[#ffaf06] font-semibold text-[#2f2f2f]"
                : "font-normal text-[#2f2f2f]"
            )}
          >
            {tab.label}
            {isActive && count !== undefined && (
              <span className="flex min-w-[22px] items-center justify-center rounded bg-white p-1 text-xs font-semibold text-[#2f2f2f]">
                {count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
