'use client';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export const BackButton = () => {
    const router = useRouter();
    return (
        <div className='flex justify-center items-center h-full'>
            <Button variant='outline' onClick={() => router.back()} className='m-4'>
                Go Back
            </Button>
        </div>
    );
};
