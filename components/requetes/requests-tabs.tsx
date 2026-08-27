"use client"

import type { RequestStatus } from "@/components/requetes/types"
import { cn } from "@/lib/utils"

const tabs: { value: RequestStatus; label: string }[] = [
  { value: "en-attente", label: "En attente" },
  { value: "accepte", label: "Acceptés" },
  { value: "rejete", label: "Rejetés" },
]

export function RequestsTabs({
  value,
  onChange,
  pendingCount,
}: {
  value: RequestStatus
  onChange: (status: RequestStatus) => void
  pendingCount?: number
}) {
  return (
    <div className="inline-flex items-center overflow-hidden rounded border border-[#dfdfdf] bg-white">
      {tabs.map((tab) => {
        const isActive = tab.value === value

        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className={cn(
              "flex min-h-9 items-center justify-center gap-2 px-4 py-1 text-sm text-[#2f2f2f]",
              isActive ? "bg-[#ffaf06] font-semibold" : "font-normal"
            )}
          >
            {tab.label}
            {isActive && tab.value === "en-attente" && pendingCount !== undefined && (
              <span className="flex min-w-[22px] items-center justify-center rounded bg-white p-1 text-xs font-semibold text-[#2f2f2f]">
                {pendingCount}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
