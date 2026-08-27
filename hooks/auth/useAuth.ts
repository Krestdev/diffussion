import { queryKeys } from "@/lib/queryKeys"
import { useStore } from "@/provider/datastore"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { authQuery } from "./authQuery"
import type { LoginPayload, RegisterPayload } from "./type"

// The current user's own profile — separate from the admin "users list"
// resource (queryKeys.user), which is a different endpoint entirely.
export function useCurrentUser() {
  const { accessToken, isHydrated } = useStore()
  return useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: authQuery.me,
    enabled: isHydrated && Boolean(accessToken),
    staleTime: 60_000,
  })
}

export function useLogin() {
  const setTokens = useStore((s) => s.setTokens)
  const login = useStore((s) => s.login)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: LoginPayload) => authQuery.login(payload),
    onSuccess: async (tokens) => {
      // Store the tokens first so the /auth/me request below (via the
      // axios request interceptor) actually carries the new Authorization
      // header.
      setTokens(tokens)
      const user = await authQuery.me()
      login({ user, ...tokens })
      await queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() })
    },
  })
}

export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => authQuery.register(payload),
  })
}

export function useLogout() {
  const logout = useStore((s) => s.logout)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authQuery.logout,
    onSettled: () => {
      // Log out client-side even if the network call fails — an expired
      // token shouldn't trap the user on a dead session.
      logout()
      queryClient.clear()
    },
  })
}
