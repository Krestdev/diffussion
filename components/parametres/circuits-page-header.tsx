"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/shared/page-header"
import { CircuitFormDialog } from "@/components/parametres/circuit-form-dialog"

export function CircuitsPageHeader() {
  const [createOpen, setCreateOpen] = useState(false)

  return (
    <>
      <PageHeader
        title="Circuits de validation"
        subtitle="Gestion des circuits de validation des courriers"
        backHref="/administration/parametres"
        variant="secondary"
        action={
          <Button
            className="h-11 w-fit rounded-lg bg-white px-5 text-base font-medium text-[#2f2f2f] normal-case tracking-normal hover:bg-white/90"
            onClick={() => setCreateOpen(true)}
          >
            Nouveau circuit
          </Button>
        }
      />
      <CircuitFormDialog open={createOpen} onOpenChange={setCreateOpen} />
    </>
  )
}
