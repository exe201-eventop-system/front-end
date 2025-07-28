export enum UserRole {
  Demo = 0,
  Admin = 1,
  Inspector = 2,
  Supplier = 3,
  Customer = 4,
}


export interface User {
  id: string;
  email: string;
  role: UserRole;
  userName: string;
  avatar: string;
  phone_number: string;
}
export interface UserAllInfo {
  id: string;
  email: string;
  role: UserRole;
  user_name: string;
  phone_number: string;
  address: string;
}

export interface UserToken {
  Email?: string;
  Role?: string;
  Id?: string;
  UserName?: string;
  Address?: string;
  Avatar?: string;
}

export interface UserProfile {
  email: string;
  user_name: string;
  address: string;
  avatar: string;
  phone_number: string;
}