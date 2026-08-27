import { queryKeys } from "@/lib/queryKeys"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { correspondentQuery } from "./correspondentQuery"
import type { CorrespondentPayload, FindCorrespondentsParams } from "./type"

export function useCorrespondents(params?: FindCorrespondentsParams) {
  return useQuery({
    queryKey: queryKeys.correspondent(params ?? {}),
    queryFn: () => correspondentQuery.getPaged(params),
  })
}

export function useCorrespondent(id: string) {
  return useQuery({
    queryKey: queryKeys.correspondent(id),
    queryFn: () => correspondentQuery.getById(id),
    enabled: Boolean(id),
  })
}

export function useCreateCorrespondent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: CorrespondentPayload) => correspondentQuery.post(body),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.correspondent() }),
  })
}

export function useUpdateCorrespondent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string
      body: Partial<CorrespondentPayload>
    }) => correspondentQuery.patch(id, body),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.correspondent() }),
  })
}

export function useDeleteCorrespondent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => correspondentQuery.delete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.correspondent() }),
  })
}
