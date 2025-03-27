'use client';

import * as React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

interface AudioPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
    src: string;
    onStartPlaying?: () => void;
    onEndPlaying?: () => void;
}

export function AudioPlayer({ src, onStartPlaying, onEndPlaying, className, ...props }: AudioPlayerProps) {
    const [playing, setPlaying] = React.useState(false);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);

    const audioRef = React.useRef<HTMLAudioElement>(null);

    React.useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // Event handlers
        audio.addEventListener('timeupdate', () => setCurrentTime(audio.currentTime));
        audio.addEventListener('loadedmetadata', () => {
            setDuration(audio.duration);
            setLoading(false);
        });
        audio.addEventListener('ended', () => {
            setPlaying(false);
            setCurrentTime(0);
            onEndPlaying ? onEndPlaying() : null;
        });
        audio.addEventListener('error', () => {
            setError(true);
            setLoading(false);
        });

        return () => {
            // Cleanup event listeners
            audio.removeEventListener('timeupdate', () => setCurrentTime(audio.currentTime));
            audio.removeEventListener('loadedmetadata', () => {
                setDuration(audio.duration);
                setLoading(false);
            });
            audio.removeEventListener('ended', () => {
                setPlaying(false);
                setCurrentTime(0);
                onEndPlaying ? onEndPlaying() : null;
            });
            audio.removeEventListener('error', () => {
                setError(true);
                setLoading(false);
            });
        };
    }, []);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (playing) {
            audio.pause();
        } else {
            audio.play();
            onStartPlaying ? onStartPlaying() : null;
        }
        setPlaying(!playing);
    };

    const handleSeek = (value: number[]) => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.currentTime = value[0];
        setCurrentTime(value[0]);
    };

    const resetPlayer = () => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.currentTime = 0;
        setCurrentTime(0);
        if (playing) {
            audio.pause();
            setPlaying(false);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className={cn('flex flex-col space-y-2', className)} {...props}>
            <audio ref={audioRef} src={src} preload='metadata' />

            {error ? (
                <div className='text-sm text-red-500'>Error loading audio</div>
            ) : loading ? (
                <div className='flex justify-center py-2'>
                    <svg className='animate-spin h-5 w-5 text-primary' viewBox='0 0 24 24'>
                        <circle
                            className='opacity-25'
                            cx='12'
                            cy='12'
                            r='10'
                            stroke='currentColor'
                            strokeWidth='4'
                        ></circle>
                        <path
                            className='opacity-75'
                            fill='currentColor'
                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                        ></path>
                    </svg>
                </div>
            ) : (
                <>
                    <div className='flex items-center space-x-2'>
                        <Button
                            id='audio-player-toggle-play'
                            type='button'
                            variant='ghost'
                            size='sm'
                            onClick={togglePlayPause}
                            className='h-8 w-8 p-0'
                            aria-label={playing ? 'Pause' : 'Play'}
                        >
                            {playing ? <Pause className='h-4 w-4' /> : <Play className='h-4 w-4' />}
                        </Button>

                        <Slider
                            value={[currentTime]}
                            min={0}
                            max={duration || 100}
                            step={0.1}
                            onValueChange={handleSeek}
                            className='flex-1'
                        />

                        <Button
                            type='button'
                            variant='ghost'
                            size='sm'
                            onClick={resetPlayer}
                            className='h-8 w-8 p-0'
                            aria-label='Reset'
                        >
                            <RotateCcw className='h-4 w-4' />
                        </Button>
                    </div>

                    <div className='flex justify-between text-xs text-muted-foreground'>
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </>
            )}
        </div>
    );
}
