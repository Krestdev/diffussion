"use client"

import { queryKeys } from "@/lib/queryKeys"
import { getSocket } from "@/lib/sockets"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { useStore } from "./datastore"

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const queryClient = useQueryClient()
  const { user } = useStore()

  useEffect(() => {
    const socket = getSocket()

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible" && !socket.connected) {
        socket.connect()
      }
    })

    socket.on("connect", () => {
      console.log("🔗 Socket connected")
    })

    socket.on("disconnect", () => {
      console.log("⛓️‍💥 Socket disconnected")
    })

    /**
     * user
     */

    const invalidateUser = () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.user(),
        refetchType: "active",
      })
    }

    socket.on("user:new", invalidateUser)
    socket.on("user:update", invalidateUser)
    socket.on("user:delete", invalidateUser)

    return () => {
      socket.off("user:new")
      socket.off("user:update")
      socket.off("user:delete")
    }
  }, [queryClient, user])

  return <>{children}</>
}
