import { queryKeys } from "@/lib/queryKeys"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { courrierQuery } from "./courrierQuery"
import type { SetAccessPayload } from "../access/type"
import type { CourrierPayload, FindCourriersParams } from "./type"

export function useCourriers(params?: FindCourriersParams) {
  return useQuery({
    queryKey: queryKeys.courrier(params ?? {}),
    queryFn: () => courrierQuery.getPaged(params),
  })
}

export function useCourrier(id: string) {
  return useQuery({
    queryKey: queryKeys.courrier(id),
    queryFn: () => courrierQuery.getById(id),
    enabled: Boolean(id),
  })
}

function useInvalidateCourriers() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: queryKeys.courrier() })
}

export function useCreateCourrier() {
  const invalidate = useInvalidateCourriers()
  return useMutation({
    mutationFn: (body: CourrierPayload) => courrierQuery.post(body),
    onSuccess: invalidate,
  })
}

export function useUpdateCourrier() {
  const invalidate = useInvalidateCourriers()
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<CourrierPayload> }) =>
      courrierQuery.patch(id, body),
    onSuccess: invalidate,
  })
}

export function useDeleteCourrier() {
  const invalidate = useInvalidateCourriers()
  return useMutation({
    mutationFn: (id: string) => courrierQuery.delete(id),
    onSuccess: invalidate,
  })
}

export function useTransmitCourrier() {
  const invalidate = useInvalidateCourriers()
  return useMutation({
    mutationFn: (id: string) => courrierQuery.transmit(id),
    onSuccess: invalidate,
  })
}

export function useSubmitCourrierForVerification() {
  const invalidate = useInvalidateCourriers()
  return useMutation({
    mutationFn: (id: string) => courrierQuery.submitForVerification(id),
    onSuccess: invalidate,
  })
}

export function useVerifyCourrier() {
  const invalidate = useInvalidateCourriers()
  return useMutation({
    mutationFn: ({ id, approved }: { id: string; approved: boolean }) =>
      courrierQuery.verify(id, approved),
    onSuccess: invalidate,
  })
}

export function useValidateCourrier() {
  const invalidate = useInvalidateCourriers()
  return useMutation({
    mutationFn: ({
      id,
      approved,
      motif,
    }: {
      id: string
      approved: boolean
      motif?: string
    }) => courrierQuery.validate(id, approved, motif),
    onSuccess: invalidate,
  })
}

export function useSendCourrier() {
  const invalidate = useInvalidateCourriers()
  return useMutation({
    mutationFn: (id: string) => courrierQuery.send(id),
    onSuccess: invalidate,
  })
}

export function useCancelCourrier() {
  const invalidate = useInvalidateCourriers()
  return useMutation({
    mutationFn: (id: string) => courrierQuery.cancel(id),
    onSuccess: invalidate,
  })
}

export function useCloseCourrier() {
  const invalidate = useInvalidateCourriers()
  return useMutation({
    mutationFn: (id: string) => courrierQuery.close(id),
    onSuccess: invalidate,
  })
}

export function useArchiveCourrier() {
  const invalidate = useInvalidateCourriers()
  return useMutation({
    mutationFn: (id: string) => courrierQuery.archive(id),
    onSuccess: invalidate,
  })
}

export function useUnarchiveCourrier() {
  const invalidate = useInvalidateCourriers()
  return useMutation({
    mutationFn: (id: string) => courrierQuery.unarchive(id),
    onSuccess: invalidate,
  })
}

export function useDischargeCourrier() {
  const invalidate = useInvalidateCourriers()
  return useMutation({
    mutationFn: (id: string) => courrierQuery.discharge(id),
    onSuccess: invalidate,
  })
}

export function useCourrierAccess(id: string) {
  return useQuery({
    queryKey: queryKeys.courrier(id, "access"),
    queryFn: () => courrierQuery.getAccess(id),
    enabled: Boolean(id),
  })
}

export function useSetCourrierAccess() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: SetAccessPayload }) =>
      courrierQuery.setAccess(id, body),
    onSuccess: (_data, { id }) =>
      queryClient.invalidateQueries({ queryKey: queryKeys.courrier(id, "access") }),
  })
}
