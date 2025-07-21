
export interface LoginRequest {
  phone_number: string;
  password: string;
}

export interface LoginResponse {
  access_token?: string;
}
export interface OPTRequest {
  phone_number: string;
}
