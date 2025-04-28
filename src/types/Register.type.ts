export interface RegisterRequest {
  full_name: string;
  email: string;
  //user_name: string;
  password: string;
}

export interface RegisterResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}
