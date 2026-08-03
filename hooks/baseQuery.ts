import api from "@/lib/axios";
import { AxiosInstance } from "axios";


export class BaseQuery<T, U> {
  url: string;
  api: AxiosInstance;
  constructor(url: string) {
    this.url = url;
    this.api = api
  }

  get = async (params?: Record<string, string | number>): Promise<Array<T>> => {
    try {
      const response = await this.api.get(this.url, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  post = async (body: U): Promise<T> => {
    try {
      const response = await this.api.post(this.url, body);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  put = async (id: string, body: U): Promise<T> => {
    try {
      const response = await this.api.put(`${this.url}/${id}`, body);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  delete = async (id: string): Promise<T> => {
    try {
      const response = await this.api.delete(`${this.url}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getById = async (id: string): Promise<T> => {
    try {
      const response = await this.api.get(`${this.url}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
}