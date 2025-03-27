'use client';

import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { StepButtons } from '../StepButtons';
import { getStep } from '@/lib/utils/step';
import { StepContainer } from '@/components/StepContainer';
import { Button } from '@/components/ui/button';
import TextareaFormField from '@/app/builder/TextareaFormField';
import { useTypewriterEffect } from '@/hooks/useTypewriterEffect';
import { AIIcon } from '@/components/AIIcon';
import { AudioPlayerDemo } from './AudioPlayerDemo';
import { useCoachMark } from '@/hooks/useCoachMark';

const topSkillsFormSchema = z.object({
    topSkills: z.string().default('')
});

type TopSkillsFormValues = z.infer<typeof topSkillsFormSchema>;

type TopSkillsFormProps = {
    onNext?: () => void;
    onPrevious: () => void;
    onReturnToHome: () => void;
};

export default function DemoTopSkillsForm({ onNext, onPrevious, onReturnToHome }: TopSkillsFormProps) {
    const [audioDone, setAudioDone] = useState(false);
    const nextButtonCoachMark = useCoachMark();

    const formHook = useForm<TopSkillsFormValues>({
        resolver: zodResolver(topSkillsFormSchema)
    });
    const step = getStep('top-skills');

    const demoData = {
        topSkills:
            '[PRIMARY SKILLS]\n' +
            '- Culinary Expertise (Expert) - Demonstrated through spearheading traditional African cuisine preparations and assisting the head chef ...\n' +
            '\n' +
            '- Time Management (Advanced) - Highlighted by playing a pivotal role during peak weekend and night shifts ...'
    };

    const { typing, completed } = useTypewriterEffect(formHook, demoData, {
        initialDelay: 1000,
        typeDelay: 20,
        fieldDelay: 800,
        onComplete: () => {
            console.log('All fields filled!');
        }
    });

    useEffect(() => {
        if (completed && !typing && audioDone) {
            // Show coach mark for next button when typing is completed
            nextButtonCoachMark.showCoachMark(
                'next-button',
                <div>
                    <p className='text-sm'>Top skills identified</p>
                    <p className='text-xs mt-1'>Click next to download your CV</p>
                </div>
            );
        }
    }, [completed, typing, audioDone, nextButtonCoachMark.showCoachMark]);

    // Clean up on unmount
    useEffect(() => {
        return () => {
            nextButtonCoachMark.hideCoachMark();
        };
    }, [nextButtonCoachMark.hideCoachMark]);

    async function onSubmit(event?: React.BaseSyntheticEvent) {
        event?.preventDefault(); // Prevent form submission immediately

        const submitter = (event?.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
        const submitterName = submitter?.name;

        if (onNext && submitterName === 'next') {
            formHook.handleSubmit(async () => {
                onNext();
            })();
        } else if (onPrevious && submitterName === 'previous') {
            onPrevious();
        }

        event?.preventDefault();
    }

    return (
        <>
            <Form {...formHook}>
                <form onSubmit={onSubmit}>
                    <StepContainer step={step}>
                        <div className='flex flex-col md:flex-row justify-end gap-2 mt-4'>
                            <Button variant='outline' disabled={typing && !completed}>
                                <AIIcon />
                                {!completed ? (
                                    <>
                                        <span>Generating...</span>
                                        <span className='animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full ml-2' />
                                    </>
                                ) : (
                                    <span>Generate your Top skills using AI</span>
                                )}
                            </Button>
                        </div>

                        <div className='relative'>
                            <TextareaFormField
                                formHook={formHook}
                                fieldName='topSkills'
                                placeholder='AI generated text will appear here'
                                rows={10}
                            />
                        </div>
                        <AudioPlayerDemo onEndPlaying={() => setAudioDone(true)}/>
                    </StepContainer>
                    <StepButtons
                        onPrevious={onPrevious}
                        onNext={onNext}
                        typing={typing}
                        completed={completed && audioDone}
                        onReturnToHome={onReturnToHome}
                    />
                </form>
            </Form>
            {/* Render the coach mark component in your component */}
            <nextButtonCoachMark.CoachMark />
        </>
    );
}
