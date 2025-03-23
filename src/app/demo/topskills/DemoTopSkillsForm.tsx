'use client';

import React, { useEffect, useRef, useState } from 'react';
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
import { AudioPlayer } from '@/components/core/AudioPlayer';
import { useCoachMarkContext } from '@/contexts/CoachMarkContext';

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
    const { showCoachMark, hideCoachMark } = useCoachMarkContext();
    const coachMarkShownRef = useRef(false);

    const formHook = useForm<TopSkillsFormValues>({
        resolver: zodResolver(topSkillsFormSchema)
    });
    const [isGeneratingText, setIsGeneratingText] = useState(false);
    const step = getStep('top-skills');

    const demoData = {
        topSkills: 'Your top skills are...'
    };

    const { typing, completed } = useTypewriterEffect(formHook, demoData, {
        initialDelay: 1000,
        typeDelay: 50,
        fieldDelay: 800,
        onComplete: () => {
            console.log('All fields filled!');
        }
    });

    useEffect(() => {
        setTimeout(() => {
            setIsGeneratingText(true);
        }, 500);
    }, []);

    useEffect(() => {
        if (completed && !typing && !coachMarkShownRef.current) {
            coachMarkShownRef.current = true; // Prevent showing multiple times
            console.log('Form completed. Starting timeout for coach mark...');

            // Use a slight delay to ensure everything is rendered
            setTimeout(() => {
                showCoachMark(
                    'audio-player-toggle-play', // ID of the element to highlight
                    <div>
                        <p className='text-sm'>Listen to a sample AI generated conversation</p>
                    </div>
                );
            }, 500);
        }
    }, [completed, typing]);

    // Clean up coach marks when component unmounts
    useEffect(() => {
        return () => {
            hideCoachMark(); // Hide coach mark when navigating away
        };
    }, [hideCoachMark]);

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
                                {isGeneratingText && !completed ? (
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
                                rows={8}
                            />
                        </div>
                        {completed && (
                            <div className='border border-gray-200 rounded-lg p-4 mt-4'>
                                <div className='text-xs'>A sample conversation of AI generated conversation</div>
                                <AudioPlayer src='/audio/sample-topskills-discussion.mp3' className='mt-4' />
                            </div>
                        )}
                    </StepContainer>
                    <StepButtons
                        onPrevious={onPrevious}
                        onNext={onNext}
                        typing={typing}
                        completed={completed}
                        onReturnToHome={onReturnToHome}
                    />
                </form>
            </Form>
        </>
    );
}
