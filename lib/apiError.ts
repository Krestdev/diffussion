import { isAxiosError } from "axios"

// Nest's built-in exception filter shape: { message: string | string[], ... }.
export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (!isAxiosError(error)) return fallback
  const data = error.response?.data as { message?: string | string[] } | undefined
  const message = data?.message
  if (Array.isArray(message)) return message.join(", ")
  return message ?? fallback
}
