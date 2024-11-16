'use client';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';

interface LoginSwitchButtonProps {
    onClick: () => void;
}

export default function LoginSwitchButton({ onClick }: LoginSwitchButtonProps) {
    return (
        <Button
            onClick={onClick}
            className={cn(buttonVariants({ variant: 'secondary' }), 'absolute right-2 top-2 md:right-8 md:top-8')}
        >
            Login
        </Button>
    );
}
