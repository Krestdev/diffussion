// Je vais ecrire le store en utilisant zustand avec persistance en sessionStorage
import { UserT } from "@/hooks/user/type";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Store {
  user?: UserT;
  isHydrated: boolean;
  token?: string;
}
interface Actions {
  setIsHydrated: (v: boolean) => void;
  login: ({ user, token }: { user: UserT; token: string }) => void;
  logout: () => void;
  update: ({ user }: { user: UserT }) => void;
}

const initialState: Store = {
  user: undefined,
  isHydrated: false,
  token: undefined,
};

export const useStore = create<Store & Actions>()(
  persist(
    (set) => ({
      user: undefined,
      isHydrated: false,
      token: undefined,
      setIsHydrated: (v: boolean) => set({ isHydrated: v }),
      login: ({ user, token }) =>
        set({
          user: user,
          token: token,
        }),
      logout: () => set(initialState),
      update: ({ user }) => set({ user: user }),
    }),
    {
      name: "diffussion-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        ...state,
        user: state.user,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setIsHydrated(true);
      },
    },
  ),
);
