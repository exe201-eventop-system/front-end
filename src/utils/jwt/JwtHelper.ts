import { jwtDecode } from "jwt-decode";
import { JwtPayload, UserPayload } from "../../types/Auth/Token.type";
import { UserRole } from "../../types/Auth/User.type";



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

    getSubject(): string | undefined {
        return this.decode()?.sub;
    }
}
export const handleTokenStorage = (token: string): void => {
    if (!token) return;

    localStorage.setItem("access_token", token);
};

export const getUserPayload = (): UserPayload | null => {
    const token = localStorage.getItem("access_token");
    if (!token) return null;

    try {
        const helper = new JwtHelper(token);
        const payload = helper.getPayload() as UserPayload | null;

        if (payload && payload.Role !== undefined && payload.Role !== null) {
            return payload;
        }
    } catch (error) {
        console.error("Failed to parse token payload:", error);
    }

    return null;
};

export const getUserRole = (): UserRole => {
    const token = localStorage.getItem("access_token");
    if (!token) return UserRole.Customer;
    try {
        const helper = new JwtHelper(token);
        const payload = helper.getPayload() as UserPayload | null;
        if (payload && payload.Role !== undefined && payload.Role !== null) {
            return Number(payload.Role) as UserRole;
        }
    } catch (e) {
    }
    return UserRole.Customer;
};

