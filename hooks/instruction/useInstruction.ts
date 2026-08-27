import { queryKeys } from "@/lib/queryKeys"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { instructionQuery } from "./instructionQuery"
import type {
  AssignInstructionPayload,
  CreateInstructionPayload,
  FindInstructionsParams,
} from "./type"

export function useInstructions(params?: FindInstructionsParams) {
  return useQuery({
    queryKey: queryKeys.instruction(params ?? {}),
    queryFn: () => instructionQuery.getPaged(params),
  })
}

export function useInstruction(id: string) {
  return useQuery({
    queryKey: queryKeys.instruction(id),
    queryFn: () => instructionQuery.getById(id),
    enabled: Boolean(id),
  })
}

function useInvalidateInstructions() {
  const queryClient = useQueryClient()
  return () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.instruction() })
}

export function useCreateInstruction() {
  const invalidate = useInvalidateInstructions()
  return useMutation({
    mutationFn: (body: CreateInstructionPayload) => instructionQuery.post(body),
    onSuccess: invalidate,
  })
}

export function useAssignInstruction() {
  const invalidate = useInvalidateInstructions()
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: AssignInstructionPayload }) =>
      instructionQuery.assign(id, body),
    onSuccess: invalidate,
  })
}

export function useAcceptInstruction() {
  const invalidate = useInvalidateInstructions()
  return useMutation({
    mutationFn: (id: string) => instructionQuery.accept(id),
    onSuccess: invalidate,
  })
}

export function useRefuseInstruction() {
  const invalidate = useInvalidateInstructions()
  return useMutation({
    mutationFn: ({ id, motif }: { id: string; motif: string }) =>
      instructionQuery.refuse(id, motif),
    onSuccess: invalidate,
  })
}

export function useCloseInstruction() {
  const invalidate = useInvalidateInstructions()
  return useMutation({
    mutationFn: (id: string) => instructionQuery.close(id),
    onSuccess: invalidate,
  })
}

export function useCancelInstruction() {
  const invalidate = useInvalidateInstructions()
  return useMutation({
    mutationFn: (id: string) => instructionQuery.cancel(id),
    onSuccess: invalidate,
  })
}
