import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit';
import { toast } from '@/hooks/use-toast';
import { ApiError } from '@/lib/type';
import { formatErrorMessage } from '@/lib/utils/errorUtils';

// Type for rejected action with value
interface RejectedAction {
    payload: ApiError;
    type: string;
    meta: {
        requestId: string;
        arg: unknown;
    };
}

const errorMiddleware: Middleware = () => (next) => (action: unknown) => {
    if (isRejectedWithValue(action)) {
        const errorMessage = formatErrorMessage(action.payload);
        const rejectedAction = action as RejectedAction;

        const status = rejectedAction.payload?.status;

        switch (status) {
            case 401:
                toast({
                    title: 'Authentication Error',
                    description: 'Please log in again',
                    variant: 'destructive'
                });
                // Optionally trigger a logout or redirect
                break;

            case 403:
                toast({
                    title: 'Permission Denied',
                    description: "You don't have permission to perform this action",
                    variant: 'destructive'
                });
                break;

            case 404:
                toast({
                    title: 'Not Found',
                    description: errorMessage,
                    variant: 'destructive'
                });
                break;

            case 422:
                toast({
                    title: 'Validation Error',
                    description: errorMessage,
                    variant: 'destructive'
                });
                break;

            default:
                toast({
                    title: 'Error',
                    description: errorMessage,
                    variant: 'destructive'
                });
        }
    }

    return next(action);
};

export default errorMiddleware;
