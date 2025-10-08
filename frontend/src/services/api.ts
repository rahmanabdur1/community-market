// services/api.ts
import axios, { AxiosInstance, AxiosError } from "axios";
import { useSessionStore } from "@/store/useSessionStore";
import { NormalizedError } from "@/types/error.type";
import { getValueByPath } from "@/lib/utils";

// Base API config
const baseURL = "http://localhost:4000/api";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

// Public API instance (no auth required)
export const api: AxiosInstance = axios.create({
  baseURL,
  headers: { "X-API-KEY": API_KEY },
});

// Authenticated API instance
export const authApi: AxiosInstance = axios.create({
  baseURL,
  headers: { "X-API-KEY": API_KEY },
});



authApi.interceptors.request.use((config) => {
  const { session } = useSessionStore.getState();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});


// Error handler
export const handleApiError = (error: unknown, special?: string): NormalizedError => {
  const err = error as AxiosError<{ message?: string | string[]; errors?: Record<string, string[]> }>;

  if (!err.response) {
    return { message: err.message || "Network request failed", status: 0, isClientError: true };
  }

  const { status, data } = err.response;
  let message = "An unexpected error occurred";

  if (typeof data?.message === "string") message = data.message;
  else if (Array.isArray(data?.message)) message = data.message[0];
  else if (data?.errors) message = Object.values(data.errors)[0]?.[0] || message;
  else if (err.response.statusText) message = err.response.statusText;

  return { message: message.trim(), special: special ? getValueByPath(data, special) : "", status, isClientError: status >= 400 && status < 500 };
};


