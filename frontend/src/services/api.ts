
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from "axios";
import { useSessionStore } from "@/store/useSessionStore";
import { NormalizedError } from "@/types/error.type";
import { getValueByPath } from "@/lib/utils";

const baseURL = process.env.NEXT_PUBLIC_BASE_API || "";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

// Public API
export const api: AxiosInstance = axios.create({
  baseURL,
  headers: { "X-API-KEY": API_KEY },
});

// Auth API (requires token)
export const authApi: AxiosInstance = axios.create({
  baseURL,
  headers: { "X-API-KEY": API_KEY },
});

if (typeof window !== "undefined") {
  authApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const { session } = useSessionStore.getState();
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
  });
}

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
