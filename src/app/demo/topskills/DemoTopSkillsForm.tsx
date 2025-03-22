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
import { ListenTopSkills } from './ListenTopSkills';
import TextareaFormField from '@/app/builder/TextareaFormField';
import { useTypewriterEffect } from '@/hooks/useTypewriterEffect';
import { AIIcon } from '@/components/AIIcon';

const topSkillsFormSchema = z.object({
    topSkills: z.string().default('')
});

type TopSkillsFormValues = z.infer<typeof topSkillsFormSchema>;

type TopSkillsFormProps = {
    onNext?: () => void;
    onPrevious: () => void;
};

export default function DemoTopSkillsForm({ onNext, onPrevious }: TopSkillsFormProps) {
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

    async function onSubmit(event?: React.BaseSyntheticEvent) {
        event?.preventDefault(); // Prevent form submission immediately

        const submitter = (event?.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
        const submitterName = submitter?.name;

        if (onNext && submitterName === 'next') {
            formHook.handleSubmit(async (data: TopSkillsFormValues) => {
                onNext();
            })();
        } else if (onPrevious && submitterName === 'previous') {
            const data = formHook.getValues();
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
                            <>
                                <ListenTopSkills dateGenerated={new Date().toLocaleString()} />
                            </>
                        )}
                    </StepContainer>
                    <StepButtons onPrevious={onPrevious} onNext={onNext} typing={typing} completed={completed} />
                </form>
            </Form>
        </>
    );
}
