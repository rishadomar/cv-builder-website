import { Middleware } from '@reduxjs/toolkit';
import { toast } from '@/hooks/use-toast';
import { isRejectedWithValue } from '@reduxjs/toolkit';

const errorMiddleware: Middleware = () => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        const errorPayload = action.payload as { data: { message: string } };
        toast({
            variant: 'destructive',
            title: 'Error',
            description: errorPayload.data.message || 'An unknown error occurred'
        });
    }
    return next(action);
};

export default errorMiddleware;
