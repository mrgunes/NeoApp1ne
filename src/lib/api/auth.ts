import type { AuthUser, LoginRequest, LoginResponse } from "@/lib/api/types";
import { api } from "@/lib/http";

export function loginApi(payload: LoginRequest) {
  return api<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function signupApi(vars: { email: string; password: string }) {
  return api<{ token: string; user: AuthUser }>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(vars),
  });
}


export async function logoutApi() {
  return api<{ ok: boolean }>("/auth/logout", { method: "POST" });
}


export function meApi() {
  return api<AuthUser>("/auth/me");
}
