import { Loader } from 'lucide-react';

export const OverlaySpinner = () => (
    <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-25 z-10'>
        <Loader className='h-10 w-10 animate-spin text-white' />
    </div>
);
