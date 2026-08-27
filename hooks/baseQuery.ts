import api from "@/lib/axios"
import { AxiosInstance } from "axios"

export type Page<T> = {
  data: T[]
  total: number
  skip: number
  take: number
}

export class BaseQuery<T, U = Partial<T>> {
  url: string
  api: AxiosInstance
  constructor(url: string) {
    this.url = url
    this.api = api
  }

  // For endpoints that return a plain array (most referentials/admin lists).
  get = async (params?: Record<string, string | number>): Promise<T[]> => {
    const response = await this.api.get(this.url, { params })
    return response.data
  }

  // For endpoints that return the `{ data, total, skip, take }` pagination
  // envelope (dossiers, courriers, instructions, livrables, correspondants).
  getPaged = async (
    params?: Record<string, string | number>,
  ): Promise<Page<T>> => {
    const response = await this.api.get(this.url, { params })
    return response.data
  }

  getById = async (id: string): Promise<T> => {
    const response = await this.api.get(`${this.url}/${id}`)
    return response.data
  }

  post = async (body: U): Promise<T> => {
    const response = await this.api.post(this.url, body)
    return response.data
  }

  // Every write endpoint on the API is PATCH, not PUT.
  patch = async (id: string, body: Partial<U>): Promise<T> => {
    const response = await this.api.patch(`${this.url}/${id}`, body)
    return response.data
  }

  delete = async (id: string): Promise<void> => {
    await this.api.delete(`${this.url}/${id}`)
  }

  // For state-changing actions with no body, e.g. POST /sites/:id/toggle-status.
  action = async (id: string, action: string, body?: unknown): Promise<T> => {
    const response = await this.api.post(`${this.url}/${id}/${action}`, body)
    return response.data
  }
}
