  import { createPostThunk } from '../genericsCreateThunk';
  import { LoginRequest, LoginResponse } from '../../types/Login.type';
  import { RegisterRequest } from '../../types/Register.type';
  import { toast } from 'react-toastify';

  export const login  = createPostThunk<LoginResponse,LoginRequest>(
      `auth/login`,
      `/login`,{
          onError: (msg) => toast.error(`Đăng nhập thất bại: ${msg}`),
      }
  );

  export const register = createPostThunk<void, RegisterRequest>(
      'auth/register',
      '/register',
      {
        onError: (msg) => toast.error(`Đăng ký thất bại: ${msg}`),
      }
    );
    export const profile  = createPostThunk<LoginRequest,void>(
      `auth/login`,
      `/login`,{
          onError: (msg) => toast.error(`Đăng nhập thất bại: ${msg}`),
      }
  );