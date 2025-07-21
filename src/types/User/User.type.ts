// user.dto.ts

export interface CreationalUser {
    user_name?: string;
    email?: string;
    password?: string;
    address?: string;
    phone_number?: string;
}

export interface SignUpDTO {
    email?: string;
    user_name?: string;
    password?: string;
    address?: string;
}

export interface UserTokenDTO {
    id?: string;
    userName?: string;
    email?: string;
    password?: string;
    address?: string;
    avatar?: string;
    role?: number;
}
export interface GetAllUserQuery {
    page?: number;
    page_size?: number;
    search?: string;
}
