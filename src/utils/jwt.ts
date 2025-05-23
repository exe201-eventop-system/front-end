import { jwtDecode } from 'jwt-decode';


export interface JwtPayload {
  sub: string;
  email: string;
  role?: string;
  exp: number;
  [key: string]: unknown ; 
}

/**
 * Giải mã token JWT và trả về payload.
 * @param token Access token cần decode
 * @returns Thông tin người dùng từ token hoặc null nếu không hợp lệ
 */
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

  return decoded.exp * 1000 < Date.now(); // `exp` tính theo giây
};

/**
 * Lấy thông tin người dùng từ access token đang lưu trong localStorage
 */
export const getCurrentUser = (): JwtPayload | null => {
  const token = localStorage.getItem("accessToken");
  if (!token || isTokenExpired(token)) return null;
  return decodeToken(token);
};
