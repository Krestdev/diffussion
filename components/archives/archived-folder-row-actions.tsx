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
import { ArchivedFolderRestoreDialog } from "@/components/archives/archived-folder-restore-dialog"
import type { Dossier } from "@/hooks/dossier/type"

// No hard-delete endpoint exists for Dossier (by design — see RG-DOS-*):
// only "Voir" and "Restaurer" are real actions here.
export function ArchivedFolderRowActions({ folder }: { folder: Dossier }) {
  const [restoreOpen, setRestoreOpen] = useState(false)

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
          <DropdownMenuItem render={<Link href={`/dossiers/${folder.id}`} />}>
            Voir
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setRestoreOpen(true)}>
            Restaurer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ArchivedFolderRestoreDialog
        folder={folder}
        open={restoreOpen}
        onOpenChange={setRestoreOpen}
      />
    </>
  )
}
