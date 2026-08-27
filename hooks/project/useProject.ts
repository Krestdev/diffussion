import { queryKeys } from "@/lib/queryKeys"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { projectQuery } from "./projectQuery"
import type { ProjectPayload } from "./type"

export function useProjects() {
  return useQuery({
    queryKey: queryKeys.project(),
    queryFn: () => projectQuery.get(),
    staleTime: 5 * 60_000,
  })
}

export function useCreateProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: ProjectPayload) => projectQuery.post(body),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.project() }),
  })
}
