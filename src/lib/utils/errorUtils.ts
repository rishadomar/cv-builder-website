import { ApiError } from '../type';

export const formatErrorMessage = (error: unknown): string => {
    if (typeof error === 'string') return error;

    if (typeof error === 'object' && error !== null) {
        const apiError = error as ApiError;

        // Handle nested error message
        if (apiError.data?.message) {
            return apiError.data.message;
        }

        // Handle validation errors
        if (apiError.data?.errors) {
            const firstError = Object.values(apiError.data.errors)[0];
            if (firstError && firstError.length > 0) {
                return firstError[0];
            }
        }
    }

    return 'An unexpected error occurred';
};
