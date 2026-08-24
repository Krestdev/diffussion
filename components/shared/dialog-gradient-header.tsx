import { X } from "lucide-react"
import type { ReactNode } from "react"

import {
  DialogClose,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const gradients = {
  primary: "from-[#9e1351] to-[#700032]",
  secondary: "from-[#0f5499] to-[#002244]",
  success: "from-[#15803d] to-[#0b411f]",
  destructive: "from-[#9e1315] to-[#700002]",
} as const

export function DialogGradientHeader({
  title,
  subtitle,
  variant = "primary",
  children,
}: {
  title: string
  subtitle: string
  variant?: keyof typeof gradients
  children?: ReactNode
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-1.5 rounded-xl bg-gradient-to-r p-5",
        gradients[variant]
      )}
    >
      <DialogTitle className="text-xl leading-tight font-semibold tracking-tight text-white normal-case">
        {title}
      </DialogTitle>
      <DialogDescription className="mt-0 text-sm text-[#f4f4f5]">
        {subtitle}
      </DialogDescription>
      {children}
      <DialogClose className="absolute top-5 right-5 text-white/80 hover:text-white">
        <X className="size-4" />
        <span className="sr-only">Fermer</span>
      </DialogClose>
    </div>
  )
}
