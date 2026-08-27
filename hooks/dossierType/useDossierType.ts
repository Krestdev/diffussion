import { queryKeys } from "@/lib/queryKeys"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { dossierTypeQuery } from "./dossierTypeQuery"
import type { DossierTypePayload } from "./type"

export function useDossierTypes() {
  return useQuery({
    queryKey: queryKeys.dossierType(),
    queryFn: () => dossierTypeQuery.get(),
    staleTime: 5 * 60_000,
  })
}

function useInvalidateDossierTypes() {
  const queryClient = useQueryClient()
  return () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.dossierType() })
}

export function useCreateDossierType() {
  const invalidate = useInvalidateDossierTypes()
  return useMutation({
    mutationFn: (body: DossierTypePayload) => dossierTypeQuery.post(body),
    onSuccess: invalidate,
  })
}

export function useUpdateDossierType() {
  const invalidate = useInvalidateDossierTypes()
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<DossierTypePayload> }) =>
      dossierTypeQuery.patch(id, body),
    onSuccess: invalidate,
  })
}

export function useDeleteDossierType() {
  const invalidate = useInvalidateDossierTypes()
  return useMutation({
    mutationFn: (id: string) => dossierTypeQuery.delete(id),
    onSuccess: invalidate,
  })
}
