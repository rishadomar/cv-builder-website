'use client';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/icons';

interface SignupSwitchButtonProps {
    onClick: () => void;
}

export default function SignupSwitchButton({ onClick }: SignupSwitchButtonProps) {
    return (
        <Button
            onClick={onClick}
            className={cn(buttonVariants({ variant: 'secondary' }), 'absolute right-2 top-2 md:right-8 md:top-8')}
        >
            <Icons.chevronLeft className='w-4 h-4 ml-2' />
            Signup
        </Button>
    );
}
