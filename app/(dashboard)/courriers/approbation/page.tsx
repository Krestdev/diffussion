"use client"

import { ApprobationMetrics } from "@/components/courriers-sortants/approbation-metrics"
import { ApprobationPageHeader } from "@/components/courriers-sortants/approbation-page-header"
import { ApprobationTable } from "@/components/courriers-sortants/approbation-table"
import { ApprobationTabs } from "@/components/courriers-sortants/approbation-tabs"
import { ListPagination } from "@/components/shared/list-pagination"
import { ListToolbar } from "@/components/shared/list-toolbar"

export default function Page() {
  return (
    <>
      <ApprobationPageHeader />
      <ApprobationMetrics />
      <ApprobationTabs />
      <ListToolbar />
      <ApprobationTable />
      <ListPagination />
    </>
  )
}
