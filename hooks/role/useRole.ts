import { queryKeys } from "@/lib/queryKeys"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { roleQuery } from "./roleQuery"
import type { RolePayload } from "./type"

export function useRoles() {
  return useQuery({
    queryKey: queryKeys.role(),
    queryFn: () => roleQuery.get(),
  })
}

export function useRole(id: string) {
  return useQuery({
    queryKey: queryKeys.role(id),
    queryFn: () => roleQuery.getById(id),
    enabled: Boolean(id),
  })
}

export function useCreateRole() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: RolePayload) => roleQuery.post(body),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.role() }),
  })
}

export function useUpdateRole() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<RolePayload> }) =>
      roleQuery.patch(id, body),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.role() }),
  })
}

export function useDeleteRole() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => roleQuery.delete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.role() }),
  })
}
