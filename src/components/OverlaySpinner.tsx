import { Icons } from './icons';

export const OverlaySpinner = () => (
    <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10'>
        <Icons.spinner className='h-10 w-10 animate-spin text-white' />
    </div>
);
