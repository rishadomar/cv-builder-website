'use client';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';

interface LoginSwitchButtonProps {
    onClick: () => void;
}

export default function LoginSwitchButton({ onClick }: LoginSwitchButtonProps) {
    return (
        <div className='absolute top-20 right-4 md:top-24 md:right-6'>
            <Button onClick={onClick} className={cn(buttonVariants({ variant: 'secondary' }))}>
                Login
            </Button>
        </div>
    );
}
