"use client"

import { cn } from "@/lib/utils"

// Generic version of the tab bar first built for Tâches (en-cours/terminées)
// — reusable anywhere a table needs client-side segmented filtering.
export function FilterTabs<T extends string>({
  tabs,
  value,
  onChange,
}: {
  tabs: { value: T; label: string; count?: number }[]
  value: T
  onChange: (value: T) => void
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
            {tab.count !== undefined && (
              <span
                className={cn(
                  "flex min-w-[22px] items-center justify-center rounded p-1 text-xs font-semibold text-[#2f2f2f]",
                  isActive ? "bg-white" : "bg-[#f4f4f5]"
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
