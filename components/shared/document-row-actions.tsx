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
import { toast } from "@/components/ui/toast"
import { GrantDocumentAccessDialog } from "@/components/shared/grant-document-access-dialog"
import {
  useDeleteDocument,
  useDocumentDownloadUrl,
} from "@/hooks/document/useDocument"
import type { DocumentItem } from "@/hooks/document/type"

export function DocumentRowActions({ document }: { document: DocumentItem }) {
  const [grantOpen, setGrantOpen] = useState(false)
  const getDownloadUrl = useDocumentDownloadUrl()
  const deleteDocument = useDeleteDocument()

  function handleDownload() {
    getDownloadUrl.mutate(document.id, {
      onSuccess: ({ url }) => window.open(url, "_blank", "noopener"),
      onError: () =>
        toast.add({ title: "Échec du téléchargement", type: "error" }),
    })
  }

  function handleDelete() {
    deleteDocument.mutate(document.id, {
      onError: () =>
        toast.add({ title: "Échec de la suppression", type: "error" }),
    })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="outline" size="icon-sm" className="rounded" />}
        >
          <Ellipsis className="size-4" />
          <span className="sr-only">Actions</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem render={<Link href={`/documents/${document.id}`} />}>
            Voir
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={getDownloadUrl.isPending}
            onClick={handleDownload}
          >
            Télécharger
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setGrantOpen(true)}>
            Accorder l&apos;accès
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            disabled={deleteDocument.isPending}
            onClick={handleDelete}
          >
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <GrantDocumentAccessDialog
        documentId={document.id}
        subtitle={document.originalName}
        open={grantOpen}
        onOpenChange={setGrantOpen}
      />
    </>
  )
}
