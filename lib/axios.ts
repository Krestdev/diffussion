import axios from "axios"
import { useStore } from "@/provider/datastore"

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Separate, un-intercepted instance for the refresh call itself — reusing
// `api` here would recurse into the response interceptor below on a 401.
const refreshClient = axios.create({ baseURL })

api.interceptors.request.use((config) => {
  const { accessToken } = useStore.getState()
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

// Queues concurrent requests that 401 while a refresh is already in
// flight, so we don't fire the refresh endpoint once per failed request.
let refreshPromise: Promise<string | null> | null = null

async function refreshAccessToken(): Promise<string | null> {
  const { refreshToken } = useStore.getState()
  if (!refreshToken) return null

  try {
    const { data } = await refreshClient.post<{
      accessToken: string
      refreshToken: string
    }>(
      "/auth/refresh",
      {},
      { headers: { Authorization: `Bearer ${refreshToken}` } },
    )
    useStore.getState().setTokens(data)
    return data.accessToken
  } catch {
    return null
  }
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error
    if (response?.status !== 401 || config?._retry || config?.url === "/auth/refresh") {
      return Promise.reject(error)
    }

    config._retry = true
    refreshPromise ??= refreshAccessToken().finally(() => {
      refreshPromise = null
    })
    const newAccessToken = await refreshPromise

    if (!newAccessToken) {
      useStore.getState().logout()
      if (typeof window !== "undefined") {
        window.location.href = "/login"
      }
      return Promise.reject(error)
    }

    config.headers.Authorization = `Bearer ${newAccessToken}`
    return api(config)
  },
)

export default api
