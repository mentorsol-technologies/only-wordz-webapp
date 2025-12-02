import axios from "axios";
import Cookies from "js-cookie";
import type { InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NESTJS_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  try {
    const token = Cookies.get("ow_token");
    if (token) {
      config.headers = config.headers ?? {};
      if (typeof config.headers.set === "function") {
        config.headers.set("Authorization", `Bearer ${token}`);
      } else {
        (config.headers as Record<string, string>)[
          "Authorization"
        ] = `Bearer ${token}`;
      }
    }
  } catch (err) {
    console.log("Error setting auth header:", err);
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized! Logging out...");
      Cookies.remove("ow_token");
    }
    return Promise.reject(error);
  }
);

export default api;
