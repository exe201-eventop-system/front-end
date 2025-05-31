import axios from 'axios';
import { checkTokenExpiration, getAccessToken, getRefreshToken, setTokens, removeTokens, startTokenExpirationCheck } from './tokenManager';

// Tạo instance axios
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Bắt đầu kiểm tra token định kỳ
startTokenExpirationCheck();

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Kiểm tra token trước mỗi request
        if (!checkTokenExpiration()) {
            // Nếu token hết hạn, chuyển hướng về trang login
            window.location.href = '/auth';
            return Promise.reject('Token expired');
        }

        // Thêm access token vào header
        const accessToken = getAccessToken();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Nếu lỗi 401 và chưa thử refresh token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Thử refresh token
                const refreshToken = getRefreshToken();
                if (!refreshToken) {
                    throw new Error('No refresh token');
                }

                const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
                    refreshToken
                });

                const { accessToken, refreshToken: newRefreshToken } = response.data;

                // Lưu token mới
                setTokens(accessToken, newRefreshToken);

                // Thử lại request ban đầu với token mới
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // Nếu refresh token thất bại, xóa token và chuyển về trang login
                removeTokens();
                window.location.href = '/auth';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance; 