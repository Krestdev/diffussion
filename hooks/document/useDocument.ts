import { queryKeys } from "@/lib/queryKeys"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { documentQuery } from "./documentQuery"
import type { SetAccessPayload } from "../access/type"
import type { FindDocumentsParams } from "./type"

export function useDocument(id: string) {
  return useQuery({
    queryKey: queryKeys.document(id),
    queryFn: () => documentQuery.getById(id),
    enabled: Boolean(id),
  })
}

export function useDocuments(params?: FindDocumentsParams) {
  return useQuery({
    queryKey: queryKeys.document(params ?? {}),
    queryFn: () => documentQuery.get(params),
    enabled: Boolean(params?.dossierId || params?.courrierId || params?.livrableId),
  })
}

export function useDeleteDocument() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => documentQuery.delete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.document() }),
  })
}

export function useDocumentDownloadUrl() {
  return useMutation({
    mutationFn: (id: string) => documentQuery.getDownloadUrl(id),
  })
}

export function useDocumentAccess(id: string) {
  return useQuery({
    queryKey: queryKeys.document(id, "access"),
    queryFn: () => documentQuery.getAccess(id),
    enabled: Boolean(id),
  })
}

export function useSetDocumentAccess() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: SetAccessPayload }) =>
      documentQuery.setAccess(id, body),
    onSuccess: (_data, { id }) =>
      queryClient.invalidateQueries({ queryKey: queryKeys.document(id, "access") }),
  })
}

export function useUploadDocument() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      file,
      ...owner
    }: {
      file: File
      dossierId?: string
      courrierId?: string
      livrableId?: string
    }) => documentQuery.upload(file, owner),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.document() }),
  })
}
