import { Middleware } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { isRejectedWithValue } from '@reduxjs/toolkit';

const errorMiddleware: Middleware = () => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        const errorPayload = action.payload as { data: { error: string } };
        toast.error(errorPayload.data.error || 'An unknown error occurred');
    }
    return next(action);
};

export default errorMiddleware;
