"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/shared/page-header"
import { CategoryFormDialog } from "@/components/parametres/category-form-dialog"

export function CategoriesPageHeader() {
  const [createOpen, setCreateOpen] = useState(false)

  return (
    <>
      <PageHeader
        title="Catégories de documents"
        subtitle="Gestion des catégories associées aux documents"
        backHref="/administration/parametres"
        variant="secondary"
        action={
          <Button
            className="h-11 w-fit rounded-lg bg-white px-5 text-base font-medium text-[#2f2f2f] normal-case tracking-normal hover:bg-white/90"
            onClick={() => setCreateOpen(true)}
          >
            Nouvelle catégorie
          </Button>
        }
      />
      <CategoryFormDialog open={createOpen} onOpenChange={setCreateOpen} />
    </>
  )
}
