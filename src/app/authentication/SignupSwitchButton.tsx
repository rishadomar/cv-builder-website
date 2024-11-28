'use client';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';

interface SignupSwitchButtonProps {
    onClick: () => void;
}

export default function SignupSwitchButton({ onClick }: SignupSwitchButtonProps) {
    return (
        <div className='absolute top-20 right-4 md:top-24 md:right-6'>
            <Button onClick={onClick} className={cn(buttonVariants({ variant: 'secondary' }))}>
                Signup
            </Button>
        </div>
    );
}
