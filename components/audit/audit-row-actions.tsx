"use client"

import { useState } from "react"
import { Ellipsis } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AuditViewDialog } from "@/components/audit/audit-view-dialog"
import type { ActivityLog } from "@/hooks/activity/type"

// A log entry is an immutable record — "Voir" is the only real action.
export function AuditRowActions({ log }: { log: ActivityLog }) {
  const [viewOpen, setViewOpen] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="outline" size="icon-sm" className="rounded" />
          }
        >
          <Ellipsis className="size-4" />
          <span className="sr-only">Actions</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setViewOpen(true)}>
            Voir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AuditViewDialog log={log} open={viewOpen} onOpenChange={setViewOpen} />
    </>
  )
}
