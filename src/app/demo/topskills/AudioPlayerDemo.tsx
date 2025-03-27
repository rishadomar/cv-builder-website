import { AudioPlayer } from '@/components/core/AudioPlayer';
import { useCoachMark } from '@/hooks/useCoachMark';
import { useEffect } from 'react';

type AudioPlayerDemoProps = {
    onEndPlaying?: () => void;
};
export const AudioPlayerDemo = ({ onEndPlaying }: AudioPlayerDemoProps) => {
    // Create an independent coach mark for the audio player
    const audioCoachMark = useCoachMark();

    useEffect(() => {
        // Show coach mark after a delay
        const timer = setTimeout(() => {
            audioCoachMark.showCoachMark(
                'audio-player-toggle-play',
                <div>
                    <p className='text-sm'>Listen to a sample AI generated conversation</p>
                </div>
            );
        }, 2000);

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='border border-gray-200 rounded-lg p-4 mt-4'>
            <div className='text-xs'>A sample conversation of AI generated conversation</div>
            <AudioPlayer
                src='/audio/sample-topskills-discussion.mp3'
                onStartPlaying={() => audioCoachMark.hideCoachMark()}
                onEndPlaying={onEndPlaying}
                className='mt-4'
            />
            <audioCoachMark.CoachMark />
        </div>
    );
};
