export enum UserRole {
  Admin = "Admin",
  Inspector = "Inspector",
  Suplier = "Suplier",
  Customer = "Customer"
}


export interface User {
  id: string;
  email: string;
  role: UserRole;
  userName: string;
  address: string;
  avatar: string;
}
