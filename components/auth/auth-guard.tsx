"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { useStore } from "@/provider/datastore"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const isHydrated = useStore((s) => s.isHydrated)
  const accessToken = useStore((s) => s.accessToken)

  useEffect(() => {
    if (isHydrated && !accessToken) {
      router.replace("/login")
    }
  }, [isHydrated, accessToken, router])

  // Avoid a flash of protected content before the persisted store rehydrates,
  // and avoid rendering it at all once we know there's no session.
  if (!isHydrated || !accessToken) {
    return null
  }

  return <>{children}</>
}
