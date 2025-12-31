export type Role = "admin" | "user";

export type AuthUser = {
    id: string;
    email: string;
    role: Role;
};


export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginResponse = {
    token: string;
    user: AuthUser;
};
