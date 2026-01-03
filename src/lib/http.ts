const API_URL = import.meta.env.VITE_API_URL as string;

const TOKEN_KEY = "neo_token_v1";

const SESSION_FLAG_KEY = "neo_session_flag_v1";


// Single-flight token refresh mechanism
let refreshing: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  // Single-flight: if 10 requests 401 at once, only refresh once.
  if (!refreshing) {
    refreshing = (async () => {
      try {
        const res = await fetch(`${API_URL}/auth/refresh`, {
          method: "POST",
          credentials: "include", // <-- sends refresh cookie
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) return null;

        const data = (await res.json()) as { token?: string };
        const newToken = data.token ?? null;

        setToken(newToken);
        // clear session-expired banner if we recovered
        setSessionFlag(null);

        return newToken;
      } catch {
        return null;
      } finally {
        refreshing = null;
      }
    })();
  }

  return refreshing;
}




// Session flag is used to track session-specific data that should not persist across browser sessions.
export function setSessionFlag(value: string | null) {
    if (value) sessionStorage.setItem(SESSION_FLAG_KEY, value);
    else sessionStorage.removeItem(SESSION_FLAG_KEY);
}


// Get the session flag from session storage.
export function getSessionFlag(): string | null {
    return sessionStorage.getItem(SESSION_FLAG_KEY);
}

// Token is used for authentication and should persist across browser sessions.
export function getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
}


// Set the token in local storage.
export function setToken(token: string | null) {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
}


// Generic API request function with error handling.
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const makeRequest = async (tokenOverride?: string | null) => {
    const token = tokenOverride ?? getToken();

    const res = await fetch(`${API_URL}${path}`, {
      ...init,
      credentials: "include", // <-- REQUIRED for cookie refresh flow
      headers: {
        ...(init?.headers ?? {}),
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    return res;
  };

  // 1) attempt request with current token
  let res = await makeRequest();

  // 2) if access token expired, try refresh once
  if (res.status === 401) {
    const newToken = await refreshAccessToken();

    if (newToken) {
      // retry original request with fresh token
      res = await makeRequest(newToken);
    } else {
      // refresh failed → hard logout behavior
      setToken(null);
      setSessionFlag("session_expired");
      throw new Error("Session expired. Please sign in again.");
    }
  }

  // 3) handle non-OK responses
  if (!res.ok) {
    let message = `Request failed: ${res.status}`;
    try {
      const data = (await res.json()) as any;
      if (data?.message) message = data.message;
    } catch {
      // ignore
    }
    throw new Error(message);
  }

  return (await res.json()) as T;
}

