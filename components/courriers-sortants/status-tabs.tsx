"use client"

import { statusTabs } from "@/components/courriers-sortants/data"
import type { OutgoingMailStatus } from "@/components/courriers-sortants/types"
import { cn } from "@/lib/utils"

export function StatusTabs({
  value,
  onChange,
}: {
  value: OutgoingMailStatus
  onChange: (status: OutgoingMailStatus) => void
}) {
  return (
    <div className="flex w-fit items-center overflow-hidden rounded border border-[#dfdfdf] bg-white">
      {statusTabs.map((tab) => {
        const isActive = tab.value === value

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
            {isActive && tab.count !== undefined && (
              <span className="flex min-w-[22px] items-center justify-center rounded bg-white p-1 text-xs font-semibold text-[#2f2f2f]">
                {tab.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
