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

// Same endpoint as useDocumentDownloadUrl, as a query instead of a
// click-triggered mutation — for rendering a preview (<img>/<iframe> src)
// as soon as the document is known, not only after an explicit click. The
// signed URL expires after 15 min (see DocumentsService.getDownloadUrl);
// refetchOnMount keeps a long-open tab from serving a stale/expired one.
export function useDocumentPreviewUrl(id: string) {
  return useQuery({
    queryKey: queryKeys.document(id, "download-url"),
    queryFn: () => documentQuery.getDownloadUrl(id),
    enabled: Boolean(id),
    refetchOnMount: "always",
    staleTime: 0,
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

export function useSetDocumentOwner() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ownerId }: { id: string; ownerId: string }) =>
      documentQuery.setOwner(id, ownerId),
    onSuccess: (_data, { id }) =>
      queryClient.invalidateQueries({ queryKey: queryKeys.document(id) }),
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
