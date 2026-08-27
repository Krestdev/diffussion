import { queryKeys } from "@/lib/queryKeys"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { correspondentTypeQuery } from "./correspondentTypeQuery"

export function useCorrespondentTypes() {
  return useQuery({
    queryKey: queryKeys.correspondentType(),
    queryFn: () => correspondentTypeQuery.get(),
    staleTime: 5 * 60_000,
  })
}

function useInvalidateCorrespondentTypes() {
  const queryClient = useQueryClient()
  return () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.correspondentType() })
}

export function useCreateCorrespondentType() {
  const invalidate = useInvalidateCorrespondentTypes()
  return useMutation({
    mutationFn: (body: { name: string }) => correspondentTypeQuery.post(body),
    onSuccess: invalidate,
  })
}

export function useUpdateCorrespondentType() {
  const invalidate = useInvalidateCorrespondentTypes()
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: { name?: string } }) =>
      correspondentTypeQuery.patch(id, body),
    onSuccess: invalidate,
  })
}

export function useDeleteCorrespondentType() {
  const invalidate = useInvalidateCorrespondentTypes()
  return useMutation({
    mutationFn: (id: string) => correspondentTypeQuery.delete(id),
    onSuccess: invalidate,
  })
}
