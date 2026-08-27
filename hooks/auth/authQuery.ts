import api from "@/lib/axios"
import type {
  AuthTokens,
  AuthUser,
  LoginPayload,
  RegisterPayload,
} from "./type"

// Auth isn't a CRUD resource, so it doesn't extend BaseQuery — but it still
// funnels every call through the single shared `api` client (layer 1).
class AuthQuery {
  login = async (body: LoginPayload): Promise<AuthTokens> => {
    const response = await api.post<AuthTokens>("/auth/login", body)
    return response.data
  }

  register = async (body: RegisterPayload): Promise<AuthTokens> => {
    const response = await api.post<AuthTokens>("/auth/register", body)
    return response.data
  }

  logout = async (): Promise<void> => {
    await api.post("/auth/logout")
  }

  me = async (): Promise<AuthUser> => {
    const response = await api.get<AuthUser>("/auth/me")
    return response.data
  }
}

export const authQuery = new AuthQuery()
