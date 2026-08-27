import { queryKeys } from "@/lib/queryKeys"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { courrierNatureQuery } from "./courrierNatureQuery"
import type { CourrierNaturePayload } from "./type"

export function useCourrierNatures() {
  return useQuery({
    queryKey: queryKeys.courrierNature(),
    queryFn: () => courrierNatureQuery.get(),
    staleTime: 5 * 60_000,
  })
}

function useInvalidateCourrierNatures() {
  const queryClient = useQueryClient()
  return () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.courrierNature() })
}

export function useCreateCourrierNature() {
  const invalidate = useInvalidateCourrierNatures()
  return useMutation({
    mutationFn: (body: CourrierNaturePayload) => courrierNatureQuery.post(body),
    onSuccess: invalidate,
  })
}

export function useUpdateCourrierNature() {
  const invalidate = useInvalidateCourrierNatures()
  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string
      body: Partial<CourrierNaturePayload>
    }) => courrierNatureQuery.patch(id, body),
    onSuccess: invalidate,
  })
}

export function useDeleteCourrierNature() {
  const invalidate = useInvalidateCourrierNatures()
  return useMutation({
    mutationFn: (id: string) => courrierNatureQuery.delete(id),
    onSuccess: invalidate,
  })
}
