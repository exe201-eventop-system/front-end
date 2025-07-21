export interface RegisterRequest {
  email: string;
  user_name: string;
  phone_number: string;
  password: string;
  address: string;
}
export interface Address {
  province?: string;
  district?: string;
  ward?: string;
  hamlet?: string;
}
export interface URL {
  url: string;
}
export interface ConfirmEmailResponse {
  access_token: string;
}
export interface RegisterRequestInput {
  email: string;
  user_name: string;
  phone_number: string;
  password: string;
  confirm_password: string;
}
