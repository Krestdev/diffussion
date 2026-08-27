import { queryKeys } from "@/lib/queryKeys"
import { useQuery } from "@tanstack/react-query"
import { canalQuery } from "./canalQuery"

export function useCanaux() {
  return useQuery({
    queryKey: queryKeys.canal(),
    queryFn: () => canalQuery.get(),
    staleTime: 5 * 60_000,
  })
}
