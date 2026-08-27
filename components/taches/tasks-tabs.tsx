"use client"

import { cn } from "@/lib/utils"

const tabs: { value: "en-cours" | "terminees"; label: string }[] = [
  { value: "en-cours", label: "En cours" },
  { value: "terminees", label: "Terminées" },
]

export function TasksTabs({
  value,
  onChange,
  inProgressCount,
}: {
  value: "en-cours" | "terminees"
  onChange: (value: "en-cours" | "terminees") => void
  inProgressCount?: number
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
            {isActive && tab.value === "en-cours" && inProgressCount !== undefined && (
              <span className="flex min-w-[22px] items-center justify-center rounded bg-white p-1 text-xs font-semibold text-[#2f2f2f]">
                {inProgressCount}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
