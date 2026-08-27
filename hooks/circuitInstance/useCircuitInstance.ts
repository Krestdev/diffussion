import { queryKeys } from "@/lib/queryKeys"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { circuitInstanceQuery } from "./circuitInstanceQuery"
import type {
  DecideCircuitInstancePayload,
  FindCircuitInstancesParams,
  StartCircuitInstancePayload,
} from "./type"

export function useCircuitInstances(params?: FindCircuitInstancesParams) {
  return useQuery({
    queryKey: queryKeys.circuitInstance(params ?? {}),
    queryFn: () => circuitInstanceQuery.get(params),
  })
}

export function useCircuitInstance(id: string) {
  return useQuery({
    queryKey: queryKeys.circuitInstance(id),
    queryFn: () => circuitInstanceQuery.getById(id),
    enabled: Boolean(id),
  })
}

export function useEligibleCircuitOwners(dossierId: string) {
  return useQuery({
    queryKey: queryKeys.circuitInstance("eligible-owners", dossierId),
    queryFn: () => circuitInstanceQuery.getEligibleOwners(dossierId),
    enabled: Boolean(dossierId),
  })
}

function useInvalidateCircuitInstances() {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.circuitInstance() })
    // Starting/deciding a courrier-linked instance also flips the
    // courrier's own status (EN_CIRCUIT / VALIDE / A_CORRIGER).
    queryClient.invalidateQueries({ queryKey: queryKeys.courrier() })
  }
}

export function useStartCircuitInstance() {
  const invalidate = useInvalidateCircuitInstances()
  return useMutation({
    mutationFn: (body: StartCircuitInstancePayload) =>
      circuitInstanceQuery.post(body),
    onSuccess: invalidate,
  })
}

export function useDecideCircuitInstance() {
  const invalidate = useInvalidateCircuitInstances()
  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string
      body: DecideCircuitInstancePayload
    }) => circuitInstanceQuery.decide(id, body),
    onSuccess: invalidate,
  })
}
