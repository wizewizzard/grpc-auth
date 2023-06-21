export interface AuthValidationResult {
    userId?: number;
    email?: string;
}

export interface LoginResult {
    error?: string[];
    token: string;
}

export interface UserToken {
    userId: number;
    email: string;
}
