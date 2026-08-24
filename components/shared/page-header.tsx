import Link from "next/link"
import { ArrowBigLeft } from "lucide-react"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export function PageHeader({
  title,
  subtitle,
  backHref,
  variant = "primary",
  action,
}: {
  title: string
  subtitle: string
  backHref: string
  variant?: "primary" | "secondary" | "success"
  action?: ReactNode
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-xl bg-gradient-to-r px-6 py-5 text-white",
        variant === "primary"
          ? "from-[#9e1351] to-[#700032]"
          : variant === "secondary"
            ? "from-[#0f5499] to-[#002244]"
            : "from-[#15803d] to-[#0b411f]"
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex flex-1 flex-col gap-1">
          <h1 className="text-[40px] leading-[1.2] font-bold tracking-tight sm:text-[48px]">
            {title}
          </h1>
          <p className="text-sm">{subtitle}</p>
        </div>
        <Link
          href={backHref}
          className="flex h-11 shrink-0 items-center gap-2 rounded-lg border border-[#dfdfdf] bg-white px-5 text-base font-medium text-[#2f2f2f]"
        >
          <ArrowBigLeft className="size-5" />
          Précédent
        </Link>
      </div>
      {action}
    </div>
  )
}
