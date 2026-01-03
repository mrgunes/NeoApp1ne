export type AuthUser = {
  id: string;
  email: string;
};

const STORAGE_KEY = "neo_auth_v1";

export function loadAuth(): { token: string; user: AuthUser } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as { token: string; user: AuthUser };
  } catch {
    return null;
  }
}

export function saveAuth(payload: { token: string; user: AuthUser }) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function clearAuth() {
  localStorage.removeItem(STORAGE_KEY);
}
