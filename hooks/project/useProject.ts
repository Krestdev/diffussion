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

function useInvalidateProjects() {
  const queryClient = useQueryClient()
  return () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.project() })
}

export function useCreateProject() {
  const invalidate = useInvalidateProjects()
  return useMutation({
    mutationFn: (body: ProjectPayload) => projectQuery.post(body),
    onSuccess: invalidate,
  })
}

export function useUpdateProject() {
  const invalidate = useInvalidateProjects()
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<ProjectPayload> }) =>
      projectQuery.patch(id, body),
    onSuccess: invalidate,
  })
}

export function useDeleteProject() {
  const invalidate = useInvalidateProjects()
  return useMutation({
    mutationFn: (id: string) => projectQuery.delete(id),
    onSuccess: invalidate,
  })
}
