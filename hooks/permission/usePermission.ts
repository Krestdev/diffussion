import { queryKeys } from "@/lib/queryKeys"
import { useQuery } from "@tanstack/react-query"
import { permissionQuery } from "./permissionQuery"

export function usePermissions() {
  return useQuery({
    queryKey: queryKeys.permission(),
    queryFn: () => permissionQuery.get(),
    staleTime: 5 * 60_000,
  })
}
