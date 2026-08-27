import { queryKeys } from "@/lib/queryKeys"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { adminUserQuery } from "./adminUserQuery"
import type { CreateAppUserPayload, UpdateAppUserPayload } from "./type"

export function useAdminUsers() {
  return useQuery({
    queryKey: queryKeys.user(),
    queryFn: () => adminUserQuery.get(),
  })
}

export function useAdminUser(id: string) {
  return useQuery({
    queryKey: queryKeys.user(id),
    queryFn: () => adminUserQuery.getById(id),
    enabled: Boolean(id),
  })
}

export function useCreateAdminUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: CreateAppUserPayload) => adminUserQuery.post(body),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.user() }),
  })
}

export function useUpdateAdminUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateAppUserPayload }) =>
      adminUserQuery.patch(id, body),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.user() }),
  })
}

export function useToggleAdminUserStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => adminUserQuery.toggleStatus(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.user() }),
  })
}

export function useDeleteAdminUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => adminUserQuery.delete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.user() }),
  })
}
