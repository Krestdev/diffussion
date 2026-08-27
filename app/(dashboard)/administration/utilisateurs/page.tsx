"use client"

import { UtilisateursPageHeader } from "@/components/utilisateurs/utilisateurs-page-header"
import { UtilisateursTable } from "@/components/utilisateurs/utilisateurs-table"
import { ListPagination } from "@/components/shared/list-pagination"
import { ListToolbar } from "@/components/shared/list-toolbar"
import { useAdminUsers } from "@/hooks/adminUser/useAdminUser"

export default function Page() {
  const { data } = useAdminUsers()

  return (
    <>
      <UtilisateursPageHeader />
      <ListToolbar />
      <UtilisateursTable />
      <ListPagination total={data?.length ?? 0} page={1} pageCount={1} />
    </>
  )
}
