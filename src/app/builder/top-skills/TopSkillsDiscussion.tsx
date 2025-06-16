import React from 'react';
import { StepButtons } from '../StepButtons';
import { useAppSelector } from '@/lib/store/hooks';
import { getStep } from '@/lib/utils/step';
import { StepContainer } from '@/components/StepContainer';
import { LearnMoreAboutConversation } from './LearnMoreAboutConversation';
import { ListenTopSkills } from './ListenTopSkills';

type TopSkillsDiscussionProps = {
    onNext?: () => void;
    onPrevious: () => void;
};

export default function TopSkillsDiscussion({ onNext, onPrevious }: TopSkillsDiscussionProps) {
    const allFieldValues = useAppSelector((state) => state.fieldValues);
    const step = getStep('top-skills-discussion');

    async function onSubmit(event?: React.BaseSyntheticEvent) {
        event?.preventDefault(); // Prevent form submission immediately

        const submitter = (event?.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
        const submitterName = submitter?.name;

        if (onNext && submitterName === 'next') {
            onNext();
        } else if (onPrevious && submitterName === 'previous') {
            onPrevious();
        }

        event?.preventDefault();
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <StepContainer step={step}>
                    {allFieldValues?.topSkillsAudio?.status === 'complete' ? (
                        <>
                            <ListenTopSkills dateGenerated={allFieldValues.topSkillsAudio.lastUpdated} />
                            <LearnMoreAboutConversation
                                title='Regenerate your conversation'
                                countGenerations={allFieldValues.topSkillsAudio.count}
                            />
                        </>
                    ) : (
                        <LearnMoreAboutConversation title='Learn more about the Top Skills' countGenerations={0} />
                    )}
                </StepContainer>
                <StepButtons onNext={onNext} onPrevious={onPrevious} />
            </form>
        </>
    );
}
