import Spinner from '@/components/core/Spinner';

export default function OverlaySpinner() {
    return (
        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-10 bg-black'>
            <Spinner size={36} />
        </div>
    );
}
