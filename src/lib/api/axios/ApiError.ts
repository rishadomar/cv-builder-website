export class ApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public code?: string,
        public errors?: Record<string, string[]>
    ) {
        super(message);
        this.name = 'ApiError';
    }

    static fromAxiosError(error: any): ApiError {
        if (error.response) {
            // Handle structured API errors
            const data = error.response.data;
            return new ApiError(
                data.message || 'An unexpected error occurred',
                error.response.status,
                data.code,
                data.errors
            );
        } else if (error.request) {
            // Handle network errors
            return new ApiError('Unable to reach the server. Please check your connection.', 0, 'NETWORK_ERROR');
        } else {
            // Handle other errors
            return new ApiError(error.message || 'An unexpected error occurred', 500, 'UNKNOWN_ERROR');
        }
    }

    get userMessage(): string {
        switch (this.status) {
            case 400:
                return this.message || 'Invalid request. Please check your input.';
            case 401:
                return 'Your session has expired. Please log in again.';
            case 403:
                return 'You do not have permission to perform this action.';
            case 404:
                return 'The requested resource was not found.';
            case 422:
                return this.message || 'Validation error. Please check your input.';
            case 429:
                return 'Too many requests. Please try again later.';
            case 500:
                return 'An unexpected server error occurred. Please try again later.';
            default:
                return this.message || 'An unexpected error occurred.';
        }
    }
}
