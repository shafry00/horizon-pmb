import axios from "axios";
import { getApiBaseUrl } from "./env.configs";
import { getAccessToken } from "@/lib/http-client";

export const axiosInstance = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export async function fetcher<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAccessToken();

  const res = await fetch(`${getApiBaseUrl()}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    let message = "Request failed";
    try {
      const errorBody = await res.json();
      message = errorBody.message || message;
    } catch {
      // Jika bukan response JSON
    }
    throw new Error(message);
  }

  return res.json();
}
