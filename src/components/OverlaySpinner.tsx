import { Loader } from 'lucide-react';

export const OverlaySpinner = () => (
    <div className='fixed inset-0 flex items-center justify-center bg-black/70 z-50'>
        <Loader className='h-10 w-10 animate-spin text-white' />
    </div>
);
