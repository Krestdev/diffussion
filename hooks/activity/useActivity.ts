import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/lib/queryKeys"
import { activityQuery } from "./activityQuery"
import type { FindActivityLogsParams } from "./type"

export function useActivityLogs(params?: FindActivityLogsParams) {
  return useQuery({
    queryKey: queryKeys.activityLog(params ?? {}),
    queryFn: () => activityQuery.getPaged(params),
  })
}

export function useActivityLog(id: string) {
  return useQuery({
    queryKey: queryKeys.activityLog(id),
    queryFn: () => activityQuery.getById(id),
    enabled: Boolean(id),
  })
}
