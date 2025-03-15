'use client';

import * as React from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

interface AudioPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
    src: string;
}

export function AudioPlayer({ src, className, ...props }: AudioPlayerProps) {
    const [playing, setPlaying] = React.useState(false);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [volume, setVolume] = React.useState(1);
    const [muted, setMuted] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);

    const audioRef = React.useRef<HTMLAudioElement>(null);

    React.useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
            setLoading(false);
        };

        const handleEnded = () => {
            setPlaying(false);
            setCurrentTime(0);
        };

        const handleError = () => {
            setError(true);
            setLoading(false);
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('error', handleError);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('error', handleError);
        };
    }, []);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (playing) {
            audio.pause();
        } else {
            audio.play();
        }
        setPlaying(!playing);
    };

    const handleVolumeChange = (value: number[]) => {
        const audio = audioRef.current;
        if (!audio) return;

        const newVolume = value[0];
        audio.volume = newVolume;
        setVolume(newVolume);

        if (newVolume === 0) {
            setMuted(true);
        } else {
            setMuted(false);
        }
    };

    const toggleMute = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (muted) {
            audio.volume = volume;
            setMuted(false);
        } else {
            audio.volume = 0;
            setMuted(true);
        }
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
                <div className='flex items-center justify-center py-3 text-sm text-red-500'>Error loading audio</div>
            ) : loading ? (
                <div className='flex items-center justify-center py-3'>
                    <svg
                        className='animate-spin h-5 w-5 text-primary'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                    >
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
                    <div className='flex items-center space-x-4'>
                        <div className='w-8'>
                            <Button
                                type='button'
                                variant='ghost'
                                size='icon'
                                onClick={togglePlayPause}
                                aria-label={playing ? 'Pause' : 'Play'}
                            >
                                {playing ? <Pause className='h-4 w-4' /> : <Play className='h-4 w-4' />}
                            </Button>
                        </div>

                        <Slider
                            value={[currentTime]}
                            min={0}
                            max={duration || 100}
                            step={0.1}
                            onValueChange={handleSeek}
                            className='flex-1'
                        />

                        <div className='flex items-center space-x-2 min-w-[120px]'>
                            <Button
                                type='button'
                                variant='ghost'
                                size='icon'
                                onClick={toggleMute}
                                aria-label={muted ? 'Unmute' : 'Mute'}
                            >
                                {muted ? <VolumeX className='h-4 w-4' /> : <Volume2 className='h-4 w-4' />}
                            </Button>

                            <Slider
                                value={[muted ? 0 : volume]}
                                min={0}
                                max={1}
                                step={0.1}
                                onValueChange={handleVolumeChange}
                                className='w-16'
                            />

                            <Button type='button' variant='ghost' size='icon' onClick={resetPlayer} aria-label='Reset'>
                                <RotateCcw className='h-4 w-4' />
                            </Button>
                        </div>
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
