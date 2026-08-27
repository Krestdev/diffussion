"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { isAxiosError } from "axios"

import { useLogin } from "@/hooks/auth/useAuth"
import { useStore } from "@/provider/datastore"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/toast"

export default function LoginPage() {
  const router = useRouter()
  const accessToken = useStore((s) => s.accessToken)
  const isHydrated = useStore((s) => s.isHydrated)
  const login = useLogin()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Already signed in — skip the login form entirely.
  useEffect(() => {
    if (isHydrated && accessToken) {
      router.replace("/")
    }
  }, [isHydrated, accessToken, router])

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    login.mutate(
      { email, password },
      {
        onSuccess: () => router.replace("/"),
        onError: (error) => {
          const message = isAxiosError(error)
            ? ((error.response?.data as { message?: string })?.message ??
              "Identifiants invalides")
            : "Une erreur est survenue"
          toast.add({ title: "Connexion impossible", description: message })
        },
      },
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f4f5] p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Diffusion</CardTitle>
          <CardDescription>
            Connectez-vous pour accéder à la plateforme
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Adresse mail</Label>
              <Input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="jason.adiogo@creaconsult.com"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <Button type="submit" className="mt-2" disabled={login.isPending}>
              {login.isPending ? "Connexion..." : "Se connecter"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
