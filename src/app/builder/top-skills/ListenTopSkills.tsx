import { PreSignedAudioPlayer } from '@/components/core/PresignedAudioPlayer';
import { formatRelativeDateTime } from '@/lib/utils';

type ListenTopSkillsProps = {
    dateGenerated: string;
};

export const ListenTopSkills = ({ dateGenerated }: ListenTopSkillsProps) => {
    return (
        <div className='border border-gray-200 rounded-lg p-4 mt-4'>
            <div className='text-xs'>{`Listen to your topskills. Generated on: ${formatRelativeDateTime(
                new Date(dateGenerated)
            )}`}</div>
            <PreSignedAudioPlayer className='mt-4' />
        </div>
    );
};
