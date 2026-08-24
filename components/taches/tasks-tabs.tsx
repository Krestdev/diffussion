"use client"

import { useState } from "react"

import { taskMetrics } from "@/components/taches/data"
import { cn } from "@/lib/utils"

const tabs: {
  value: "en-cours" | "terminees"
  label: string
  count?: number
}[] = [
  { value: "en-cours", label: "En cours", count: taskMetrics.inProgress },
  { value: "terminees", label: "Terminées" },
]

export function TasksTabs() {
  const [active, setActive] =
    useState<(typeof tabs)[number]["value"]>("en-cours")

  return (
    <div className="inline-flex items-center overflow-hidden rounded border border-[#dfdfdf] bg-white">
      {tabs.map((tab) => {
        const isActive = tab.value === active

        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActive(tab.value)}
            className={cn(
              "flex min-h-9 items-center justify-center gap-2 px-4 py-1 text-sm text-[#2f2f2f]",
              isActive ? "bg-[#ffaf06] font-semibold" : "font-normal"
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
