"use client"

import Link from "next/link"
import { useState } from "react"
import { Ellipsis } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArchivedMailRestoreDialog } from "@/components/archives/archived-mail-restore-dialog"
import type { Courrier } from "@/hooks/courrier/type"

// No hard-delete endpoint exists for Courrier once archived — only "Voir"
// and "Restaurer" are real actions here.
export function ArchivedMailRowActions({ mail }: { mail: Courrier }) {
  const [restoreOpen, setRestoreOpen] = useState(false)
  const href =
    mail.direction === "ENTRANT"
      ? `/courriers/entrants/${mail.id}`
      : `/courriers/sortants/${mail.id}`

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
          <DropdownMenuItem render={<Link href={href} />}>
            Voir
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setRestoreOpen(true)}>
            Restaurer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ArchivedMailRestoreDialog
        mail={mail}
        open={restoreOpen}
        onOpenChange={setRestoreOpen}
      />
    </>
  )
}
