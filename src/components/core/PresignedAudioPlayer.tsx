// In your PreSignedAudioPlayer.tsx:
import { useGetUserAudioUrlQuery } from '@/lib/store/api/audioApiSlice';
import { AudioPlayer } from '@/components/core/AudioPlayer';
import { Skeleton } from '@/components/ui/skeleton';

interface PreSignedAudioPlayerProps {
    fallbackSrc?: string;
    className?: string;
}

export function PreSignedAudioPlayer({ className }: PreSignedAudioPlayerProps) {
    const { data, isLoading, isError } = useGetUserAudioUrlQuery();

    // Show loading state
    if (isLoading) {
        return (
            <div className={className}>
                <div className='space-y-2'>
                    <Skeleton className='h-10 w-full' />
                    <div className='flex justify-between'>
                        <Skeleton className='h-4 w-12' />
                        <Skeleton className='h-4 w-12' />
                    </div>
                </div>
            </div>
        );
    }

    // Show error state
    if (isError || !data?.url) {
        return (
            <div className={`${className} p-4 text-center text-red-500 text-sm`}>
                Error loading audio. Please try again.
            </div>
        );
    }

    // Show player with pre-signed URL
    return <AudioPlayer src={data.url} className={className} />;
}
