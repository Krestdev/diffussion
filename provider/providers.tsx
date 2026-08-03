"use client"
import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import SocketProvider from "@/provider/socketProvider"
import { Toaster } from "@/components/ui/toast"
import { ThemeProvider } from "@/components/theme-provider"

function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient()
  return (
    <React.Fragment>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <SocketProvider>{children}</SocketProvider>
        </QueryClientProvider>
        <Toaster />
      </ThemeProvider>
    </React.Fragment>
  )
}

export default Providers
