import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    exp: number;
    [key: string]: any;
}

// Thêm biến để theo dõi trạng thái reload
let isReloading = false;

export const checkTokenExpiration = () => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    if (!accessToken || !refreshToken) return false;

    try {
        const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
        const currentTime = Date.now() / 1000;

        if (decodedAccessToken.exp < currentTime) {
            // Access token đã hết hạn, thử refresh
            const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);
            if (decodedRefreshToken.exp < currentTime) {
                // Refresh token cũng hết hạn, xóa cả hai token
                removeTokens();
                // Chỉ reload nếu chưa đang trong quá trình reload
                if (!isReloading) {
                    isReloading = true;
                    window.location.reload();
                }
                return false;
            }
            // Refresh token còn hạn, có thể dùng để lấy access token mới
            return true;
        }

        return true;
    } catch (error) {
        // Nếu có lỗi khi decode token, xóa token
        removeTokens();
        // Chỉ reload nếu chưa đang trong quá trình reload
        if (!isReloading) {
            isReloading = true;
            window.location.reload();
        }
        return false;
    }
};

// Thêm hàm để kiểm tra token định kỳ
export const startTokenExpirationCheck = () => {
    // Kiểm tra mỗi phút
    setInterval(() => {
        checkTokenExpiration();
    }, 60000);
};

export const getAccessToken = () => {
    if (checkTokenExpiration()) {
        return localStorage.getItem('access_token');
    }
    return null;
};

export const getRefreshToken = () => {
    return localStorage.getItem('refresh_token');
};

export const setTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
};

export const removeTokens = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
}; 