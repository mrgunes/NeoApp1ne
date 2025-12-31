import type { AuthUser, LoginRequest, LoginResponse } from "@/lib/api/types";
import { api } from "@/lib/http";

export function loginApi(payload: LoginRequest) {
  return api<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function meApi() {
  return api<AuthUser>("/auth/me");
}
