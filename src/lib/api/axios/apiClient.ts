import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getIdToken } from '@/lib/api/auth/authApi';
import { ApiError } from './ApiError';

export class ApiClient {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL,
            timeout: 10000
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        // Request interceptor
        this.axiosInstance.interceptors.request.use(
            async (config) => {
                const idToken = await getIdToken();
                if (idToken) {
                    config.headers['Authorization'] = `Bearer ${idToken}`;
                }
                return config;
            },
            (error) => Promise.reject(ApiError.fromAxiosError(error))
        );

        // Response interceptor
        this.axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => Promise.reject(ApiError.fromAxiosError(error))
        );
    }

    async request<T>(config: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.axiosInstance.request<T>(config);
            return response.data;
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw ApiError.fromAxiosError(error);
        }
    }
}

// Create a singleton instance
export const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_GATEWAY_URL!);
