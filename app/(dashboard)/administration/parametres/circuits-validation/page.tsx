"use client"

import { CircuitsPageHeader } from "@/components/parametres/circuits-page-header"
import { CircuitsTable } from "@/components/parametres/circuits-table"
import { ListPagination } from "@/components/shared/list-pagination"
import { ListToolbar } from "@/components/shared/list-toolbar"
import { useCircuits } from "@/hooks/circuit/useCircuit"

export default function Page() {
  const { data } = useCircuits()

  return (
    <>
      <CircuitsPageHeader />
      <ListToolbar showFilters={false} />
      <CircuitsTable />
      <ListPagination total={data?.length ?? 0} page={1} pageCount={1} />
    </>
  )
}
