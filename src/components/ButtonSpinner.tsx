import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ButtonSpinnerProps {
    className?: string;
    size?: number;
    color?: string;
}

export const ButtonSpinner = ({ className, size = 16, color }: ButtonSpinnerProps) => {
    return <Loader2 className={cn('animate-spin', className)} size={size} color={color} aria-hidden='true' />;
};
