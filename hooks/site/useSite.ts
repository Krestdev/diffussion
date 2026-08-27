import { queryKeys } from "@/lib/queryKeys"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { siteQuery } from "./siteQuery"
import type { SitePayload } from "./type"

export function useSites() {
  return useQuery({
    queryKey: queryKeys.site(),
    queryFn: () => siteQuery.get(),
  })
}

export function useSite(id: string) {
  return useQuery({
    queryKey: queryKeys.site(id),
    queryFn: () => siteQuery.getById(id),
    enabled: Boolean(id),
  })
}

export function useCreateSite() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: SitePayload) => siteQuery.post(body),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.site() }),
  })
}

export function useUpdateSite() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<SitePayload> }) =>
      siteQuery.patch(id, body),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.site() }),
  })
}

export function useToggleSiteStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => siteQuery.toggleStatus(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.site() }),
  })
}
