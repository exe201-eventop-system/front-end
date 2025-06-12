import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  //baseURL: 'https://jsonplaceholder.typicode.com/',
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      toast.error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
      localStorage.removeItem("access_token");
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;