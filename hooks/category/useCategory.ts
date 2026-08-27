import { queryKeys } from "@/lib/queryKeys"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { categoryQuery } from "./categoryQuery"
import type { CategoryPayload } from "./type"

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.category(),
    queryFn: () => categoryQuery.get(),
    staleTime: 5 * 60_000,
  })
}

function useInvalidateCategories() {
  const queryClient = useQueryClient()
  return () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.category() })
}

export function useCreateCategory() {
  const invalidate = useInvalidateCategories()
  return useMutation({
    mutationFn: (body: CategoryPayload) => categoryQuery.post(body),
    onSuccess: invalidate,
  })
}

export function useUpdateCategory() {
  const invalidate = useInvalidateCategories()
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<CategoryPayload> }) =>
      categoryQuery.patch(id, body),
    onSuccess: invalidate,
  })
}

export function useDeleteCategory() {
  const invalidate = useInvalidateCategories()
  return useMutation({
    mutationFn: (id: string) => categoryQuery.delete(id),
    onSuccess: invalidate,
  })
}
