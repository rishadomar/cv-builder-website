import axios from 'axios';
import { getIdToken } from '@/lib/api/auth/authApi';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_GATEWAY_URL
    //withCredentials: true // Ensure cookies are sent with the request
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    async (config) => {
        const idToken = await getIdToken();
        if (idToken) {
            config.headers['Authorization'] = `Bearer ${idToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
