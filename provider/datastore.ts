import type { AuthUser } from "@/hooks/auth/type"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface Store {
  user?: AuthUser
  isHydrated: boolean
  accessToken?: string
  refreshToken?: string
}

interface Actions {
  setIsHydrated: (v: boolean) => void
  login: (params: {
    user: AuthUser
    accessToken: string
    refreshToken: string
  }) => void
  setTokens: (tokens: { accessToken: string; refreshToken: string }) => void
  setUser: (user: AuthUser) => void
  logout: () => void
}

const initialState: Store = {
  user: undefined,
  isHydrated: false,
  accessToken: undefined,
  refreshToken: undefined,
}

export const useStore = create<Store & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      setIsHydrated: (v) => set({ isHydrated: v }),
      login: ({ user, accessToken, refreshToken }) =>
        set({ user, accessToken, refreshToken }),
      setTokens: ({ accessToken, refreshToken }) =>
        set({ accessToken, refreshToken }),
      setUser: (user) => set({ user }),
      logout: () => set(initialState),
    }),
    {
      name: "diffussion-store",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setIsHydrated(true)
      },
    },
  ),
)
