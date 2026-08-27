import { queryKeys } from "@/lib/queryKeys"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { dossierQuery } from "./dossierQuery"
import type {
  DossierPayload,
  FindDossiersParams,
  SetDossierAccessPayload,
} from "./type"

export function useDossiers(params?: FindDossiersParams) {
  return useQuery({
    queryKey: queryKeys.dossier(params ?? {}),
    queryFn: () => dossierQuery.getPaged(params),
  })
}

export function useDossier(id: string) {
  return useQuery({
    queryKey: queryKeys.dossier(id),
    queryFn: () => dossierQuery.getById(id),
    enabled: Boolean(id),
  })
}

export function useCreateDossier() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: DossierPayload) => dossierQuery.post(body),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.dossier() }),
  })
}

export function useUpdateDossier() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<DossierPayload> }) =>
      dossierQuery.patch(id, body),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.dossier() }),
  })
}

export function useCloseDossier() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => dossierQuery.close(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.dossier() }),
  })
}

export function useReopenDossier() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => dossierQuery.reopen(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.dossier() }),
  })
}

export function useArchiveDossier() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => dossierQuery.archive(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.dossier() }),
  })
}

export function useUnarchiveDossier() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => dossierQuery.unarchive(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.dossier() }),
  })
}

export function useDossierAccess(id: string) {
  return useQuery({
    queryKey: queryKeys.dossier(id, "access"),
    queryFn: () => dossierQuery.getAccess(id),
    enabled: Boolean(id),
  })
}

export function useSetDossierAccess() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: SetDossierAccessPayload }) =>
      dossierQuery.setAccess(id, body),
    onSuccess: (_data, { id }) =>
      queryClient.invalidateQueries({ queryKey: queryKeys.dossier(id, "access") }),
  })
}
