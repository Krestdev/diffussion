"use client"

import { RolesPageHeader } from "@/components/roles/roles-page-header"
import { RolesTable } from "@/components/roles/roles-table"
import { ListPagination } from "@/components/shared/list-pagination"
import { ListToolbar } from "@/components/shared/list-toolbar"
import { useRoles } from "@/hooks/role/useRole"

export default function Page() {
  const { data } = useRoles()

  return (
    <>
      <RolesPageHeader />
      <ListToolbar />
      <RolesTable />
      <ListPagination total={data?.length ?? 0} page={1} pageCount={1} />
    </>
  )
}
