const API_URL = import.meta.env.VITE_API_URL as string;

const TOKEN_KEY = "neo_token_v1";


const SESSION_FLAG_KEY = "neo_session_flag_v1";

export function setSessionFlag(value: string | null) {
    if (value) sessionStorage.setItem(SESSION_FLAG_KEY, value);
    else sessionStorage.removeItem(SESSION_FLAG_KEY);
}

export function getSessionFlag(): string | null {
    return sessionStorage.getItem(SESSION_FLAG_KEY);
}


export function getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null) {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
}

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
    const token = getToken();

    const res = await fetch(`${API_URL}${path}`, {
        ...init,
        headers: {
            ...(init?.headers ?? {}),
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    if (!res.ok) {
        let message = `Request failed: ${res.status}`;
        try {
            const data = (await res.json()) as any;
            if (data?.message) message = data.message;
        } catch {
            // ignore parse errors
        }
        throw new Error(message);
    }

    return (await res.json()) as T;
}
