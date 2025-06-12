import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
    sub?: string;
    Email?: string;
    Role?: string;
    exp?: number;
    iat?: number;
    [key: string]: any;
}

export class JwtHelper {
    private token: string;

    constructor(token: string) {
        this.token = token;
    }

    decode(): JwtPayload | null {
        try {
            if (!this.token) return null;
            return jwtDecode<JwtPayload>(this.token);
        } catch (error) {
            console.error("Failed to decode token:", error);
            return null;
        }
    }

    getPayload(): JwtPayload | null {
        return this.decode();
    }

    isExpired(): boolean {
        const payload = this.decode();
        if (!payload || !payload.exp) return true;

        const now = Date.now() / 1000;
        return payload.exp < now;
    }

    getToken(): string {
        return this.token;
    }

    getEmail(): string | undefined {
        return this.decode()?.email;
    }

    getRole(): string | undefined {
        return this.decode()?.role;
    }

    getSubject(): string | undefined {
        return this.decode()?.sub;
    }
}
