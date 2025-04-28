import axios from 'axios';
import { getFromLocalStorage, saveToLocalStorage, removeFromLocalStorage } from '../utils/localStorageHelper';


const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getFromLocalStorage('access_token'); // Lấy access token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Thêm vào header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor Response: Xử lý lỗi 401 (Unauthorized)
axiosInstance.interceptors.response.use(
  (response) => response, // Chuyển tiếp response bình thường
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken =  getFromLocalStorage('access_token');

        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const res = await axios.post('https://auth/refresh-token', {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = res.data;

        saveToLocalStorage(accessToken, newRefreshToken);

        // Thêm access token mới vào header
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // Retry lại yêu cầu cũ với token mới
        return axiosInstance(originalRequest); 
      } catch (refreshError) {
        // Nếu refresh token bị lỗi, xóa token và redirect đến trang login
        removeFromLocalStorage('access_token');
        window.location.href = '/login'; // Redirect đến trang login
        return Promise.reject(refreshError);
      }
    }

    // Trả về lỗi nếu không phải lỗi 401 hoặc khi không thể refresh token
    return Promise.reject(error);
  }
);

export default axiosInstance;
