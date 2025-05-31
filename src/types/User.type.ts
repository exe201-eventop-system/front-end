export enum Role {
  Admin,
  Inspector,
  Suplier, 
  Customer,
}

export interface User {
  id: string;
  email: string;
  role: Role;
  userName: string;
  address: string;
  avatar: string;
    }
