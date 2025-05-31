import { jwtDecode } from 'jwt-decode';


export interface JwtPayload {
  sub: string;
  email: string;
  role?: string;
  exp: number;
  [key: string]: unknown;
}


export const decodeToken = (token: string): JwtPayload | null => {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error("Lỗi khi decode JWT:", error);
    return null;
  }
};

/**
 * Kiểm tra token đã hết hạn chưa
 * @param token Token JWT
 * @returns true nếu token đã hết hạn, false nếu còn hiệu lực
 */
export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded) return true;

  const currentTime = Date.now();
  if (decoded.exp * 1000 < currentTime) {
    // Token đã hết hạn, xóa token
    localStorage.removeItem('token');
    return true;
  }
  return false;
};

/**
 * Lấy thông tin người dùng từ access token đang lưu trong localStorage
 */
export const getCurrentUser = (): JwtPayload | null => {
  const token = localStorage.getItem("accessToken");
  if (!token || isTokenExpired(token)) return null;
  return decodeToken(token);
};
