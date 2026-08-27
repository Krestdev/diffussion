import { queryKeys } from "@/lib/queryKeys"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { circuitQuery } from "./circuitQuery"
import type { CircuitPayload } from "./type"

export function useCircuits() {
  return useQuery({
    queryKey: queryKeys.circuit(),
    queryFn: () => circuitQuery.get(),
  })
}

export function useCircuitDetail(id: string) {
  return useQuery({
    queryKey: queryKeys.circuit(id),
    queryFn: () => circuitQuery.getById(id),
    enabled: Boolean(id),
  })
}

function useInvalidateCircuits() {
  const queryClient = useQueryClient()
  return () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.circuit() })
}

export function useCreateCircuit() {
  const invalidate = useInvalidateCircuits()
  return useMutation({
    mutationFn: (body: CircuitPayload) => circuitQuery.post(body),
    onSuccess: invalidate,
  })
}

export function useUpdateCircuit() {
  const invalidate = useInvalidateCircuits()
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<CircuitPayload> }) =>
      circuitQuery.patch(id, body),
    onSuccess: invalidate,
  })
}

export function useDeleteCircuit() {
  const invalidate = useInvalidateCircuits()
  return useMutation({
    mutationFn: (id: string) => circuitQuery.delete(id),
    onSuccess: invalidate,
  })
}
