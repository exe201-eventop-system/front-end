import { UserToken } from "./User.type";

export interface Token {
  access_token: string;
}
export interface JwtPayload extends UserToken {
  sub?: string;
  exp?: number;
  iat?: number;
  [key: string]: unknown;
}
export interface UserPayload {
  UserName: string;
  Email: string;
  PhoneNumber: string;
  Address: string;
  Avatar: string;
  Role: string | number;
}
