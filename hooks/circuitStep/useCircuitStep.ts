import { queryKeys } from "@/lib/queryKeys"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { circuitStepQuery } from "./circuitStepQuery"
import type { CircuitStepPayload } from "../circuit/type"

export function useCircuitSteps(circuitId: string) {
  return useQuery({
    queryKey: queryKeys.circuitStep(circuitId),
    queryFn: () => circuitStepQuery.get({ circuitId }),
    enabled: Boolean(circuitId),
  })
}

// Steps are also embedded (nested, ordered) on the parent Circuit returned
// by GET /circuits — every step mutation invalidates both keys so the
// circuits list/table and this steps view stay in sync.
function useInvalidateCircuitSteps() {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.circuitStep() })
    queryClient.invalidateQueries({ queryKey: queryKeys.circuit() })
  }
}

export function useCreateCircuitStep() {
  const invalidate = useInvalidateCircuitSteps()
  return useMutation({
    mutationFn: (body: CircuitStepPayload) => circuitStepQuery.post(body),
    onSuccess: invalidate,
  })
}

export function useUpdateCircuitStep() {
  const invalidate = useInvalidateCircuitSteps()
  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string
      body: Partial<CircuitStepPayload>
    }) => circuitStepQuery.patch(id, body),
    onSuccess: invalidate,
  })
}

export function useDeleteCircuitStep() {
  const invalidate = useInvalidateCircuitSteps()
  return useMutation({
    mutationFn: (id: string) => circuitStepQuery.delete(id),
    onSuccess: invalidate,
  })
}
