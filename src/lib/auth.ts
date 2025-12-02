import api from "./api";
import Cookies from "js-cookie";

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  fullName: string;
  email: string;
  password: string;
  role?: string;
};

const COOKIE_KEY = "ow_token";

export async function login(payload: LoginPayload) {
  const res = await api.post("/auth/login", payload);
  const data = res.data;
  if (!res.status || res.status >= 400)
    throw new Error(data?.message || "Login failed");

  if (data?.token) {
    try {
      Cookies.set(COOKIE_KEY, data.token, {
        expires: 7,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
    } catch (err) {
      console.log("Cookie set error:", err);
    }
  }

  return data;
}

export async function register(payload: RegisterPayload) {
  const res = await api.post("/auth/register", payload);
  const data = res.data;
  if (!res.status || res.status >= 400)
    throw new Error(data?.message || "Registration failed");

  return data;
}
export function getToken(): string | null {
  try {
    return Cookies.get(COOKIE_KEY) || null;
  } catch (err) {
    console.log(err);
    return null;
  }
}
export function logout() {
  try {
    Cookies.remove(COOKIE_KEY);
  } catch (err) {
    console.log(err);
  }
}

const authService = { login, register, getToken, logout };
export default authService;
