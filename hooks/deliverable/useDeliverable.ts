import { queryKeys } from "@/lib/queryKeys"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deliverableQuery } from "./deliverableQuery"
import type { CreateDeliverablePayload, FindDeliverablesParams } from "./type"

export function useDeliverables(params?: FindDeliverablesParams) {
  return useQuery({
    queryKey: queryKeys.deliverable(params ?? {}),
    queryFn: () => deliverableQuery.getPaged(params),
    enabled: Boolean(params?.instructionId),
  })
}

export function useCreateDeliverable() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: CreateDeliverablePayload) => deliverableQuery.post(body),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.deliverable() }),
  })
}

function useInvalidateDeliverables() {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.deliverable() })
    // Depositing/submitting a livrable can move its parent instruction's
    // status too (see DeliverableService.submit).
    queryClient.invalidateQueries({ queryKey: queryKeys.instruction() })
  }
}

export function useDepositDeliverable() {
  const invalidate = useInvalidateDeliverables()
  return useMutation({
    mutationFn: (id: string) => deliverableQuery.deposit(id),
    onSuccess: invalidate,
  })
}

export function useSubmitDeliverable() {
  const invalidate = useInvalidateDeliverables()
  return useMutation({
    mutationFn: (id: string) => deliverableQuery.submit(id),
    onSuccess: invalidate,
  })
}
