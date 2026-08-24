"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { Card } from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const DAYS = ["Sam", "Dim", "Lun", "Mar", "Mer", "Jeu", "Ven"] as const
const BARS_PER_DAY = 13

/**
 * Deterministic pseudo-random generator (mulberry32) so the sample series
 * stays stable across renders/builds instead of relying on `Math.random`.
 */
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const random = mulberry32(42)

// The design shows ~13 data points per day with a single centered day label
// on the axis — reproduced here instead of collapsing to one bar per day.
const chartData = DAYS.flatMap((day, dayIndex) =>
  Array.from({ length: BARS_PER_DAY }, (_, barIndex) => ({
    key: `${dayIndex}-${barIndex}`,
    day: barIndex === Math.floor(BARS_PER_DAY / 2) ? day : "",
    courriers: Math.round(20 + random() * 160),
  }))
)

const chartConfig = {
  courriers: {
    label: "Courriers",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function MailTrendChart() {
  return (
    <Card className="gap-4 rounded-xl p-4 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)]">
      <p className="px-2 text-base font-medium text-[#2f2f2f]">
        Évolution des courriers entrants
      </p>
      <ChartContainer
        config={chartConfig}
        className="aspect-auto h-[250px] w-full"
      >
        <BarChart data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="day"
            interval={0}
            tickLine={false}
            axisLine={false}
            tickMargin={12}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="courriers" fill="var(--color-courriers)" radius={0} />
        </BarChart>
      </ChartContainer>
    </Card>
  )
}
