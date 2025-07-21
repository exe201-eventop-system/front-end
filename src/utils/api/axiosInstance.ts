import axios, { AxiosError } from "axios";

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
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_info");
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export const getUsedService = async () => {
  return axiosInstance.get('/used-service');
};

export default axiosInstance;