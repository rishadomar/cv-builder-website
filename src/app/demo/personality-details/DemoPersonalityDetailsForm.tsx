import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import TextareaFormField from '../../builder/TextareaFormField';
import { StepButtons } from '@/app/demo/StepButtons';
import PillSelectFormField from '../../builder/PillSelectFormField';
import { getStep } from '@/lib/utils/step';
import { StepContainer } from '@/components/StepContainer';
import { useTypewriterEffect } from '@/hooks/useTypewriterEffect';
import { AIIcon } from '@/components/AIIcon';

const personalityDetailsFormSchema = z.object({
    personalityTraits: z.array(z.string()).min(1, 'At least one description is required').default([]),
    personalityText: z.string().default('')
});

type PersonalityDetailsFormValues = z.infer<typeof personalityDetailsFormSchema>;

type PersonalityDetailsFormProps = {
    onNext?: () => void;
    onPrevious: () => void;
};

const Traits = [
    'Team player',
    'Introvert',
    'Fun loving',
    'Quiet',
    'Extrovert',
    'Outgoing',
    'Creative',
    'Confident',
    'Empathetic',
    'Compassionate',
    'Adventurous',
    'Thoughtful',
    'Humorous',
    'Optimistic',
    'Independent'
];

// Demo data with pre-selected traits and personality text
const demoData = {
    personalityText:
        "As a creative and optimistic individual, I thrive in collaborative environments where I can contribute innovative ideas. I balance my outgoing nature with thoughtful consideration of others' perspectives, allowing me to build strong relationships with colleagues and clients alike. My independent work ethic ensures I can execute projects efficiently, while my team player mindset keeps me focused on collective goals."
};

// Pre-selected traits for the demo
const preSelectedTraits = ['Creative', 'Outgoing', 'Independent', 'Team player'];

export default function DemoPersonalityDetailsForm({ onNext, onPrevious }: PersonalityDetailsFormProps) {
    const formHook = useForm<PersonalityDetailsFormValues>({
        resolver: zodResolver(personalityDetailsFormSchema)
    });

    const step = getStep('personality-details');
    const [hasSelectedPills, setHasSelectedPills] = useState(false);
    const [isGeneratingText, setIsGeneratingText] = useState(false);

    // Handle pill selection animation
    useEffect(() => {
        if (hasSelectedPills) return; // Only run once

        // We'll add traits one by one with a delay to create an animation effect
        const traitTimers: NodeJS.Timeout[] = [];

        preSelectedTraits.forEach((trait, index) => {
            const timer = setTimeout(() => {
                // Get current traits and add the new one
                const currentTraits = formHook.getValues('personalityTraits') || [];
                formHook.setValue('personalityTraits', [...currentTraits, trait]);

                // When we've added the last trait, mark as complete
                if (index === preSelectedTraits.length - 1) {
                    setHasSelectedPills(true);
                    // After traits are selected, trigger the text generation
                    setTimeout(() => {
                        setIsGeneratingText(true);
                    }, 500);
                }
            }, 300 * index); // 300ms delay between each trait

            traitTimers.push(timer);
        });

        // Cleanup function
        return () => {
            traitTimers.forEach(clearTimeout);
        };
    }, [formHook]);

    // Use the typewriter effect for the text area (only after pills are selected)
    // Modify this section to make it conditional
    const { typing, completed } = useTypewriterEffect(formHook, isGeneratingText ? demoData : {}, {
        initialDelay: 3000,
        typeDelay: 20, // Faster typing for the longer text
        onComplete: () => {
            console.log('Personality text generation completed');
        }
    });

    const onSubmit = async (event?: React.BaseSyntheticEvent) => {
        event?.preventDefault();

        const submitter = (event?.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
        const submitterName = submitter?.name;

        if (onNext && submitterName === 'next') {
            formHook.handleSubmit(async (data: PersonalityDetailsFormValues) => {
                onNext();
            })();
        } else if (onPrevious && submitterName === 'previous') {
            const data = formHook.getValues();
            onPrevious();
        }

        event?.preventDefault();
    };

    return (
        <>
            <Form {...formHook}>
                <form onSubmit={onSubmit}>
                    <StepContainer step={step}>
                        <PillSelectFormField
                            formHook={formHook}
                            fieldName='personalityTraits'
                            availablePills={Traits}
                            selectedPills={formHook.watch('personalityTraits') || []}
                            error={formHook.formState.errors.personalityTraits?.message}
                        />

                        <div className='flex flex-col md:flex-row justify-end gap-2 mt-4'>
                            <Button
                                variant='outline'
                                type='button'
                                data-testid='generate-ai-text'
                                disabled={formHook.watch('personalityTraits')?.length === 0}
                                onClick={() => setIsGeneratingText(true)}
                                className={isGeneratingText && !completed ? 'relative' : ''}
                            >
                                <AIIcon />
                                {isGeneratingText && !completed ? (
                                    <>
                                        <span>Generating...</span>
                                        <span className='animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full ml-2' />
                                    </>
                                ) : (
                                    'Generate text with AI'
                                )}
                            </Button>
                        </div>

                        <div className='relative'>
                            <TextareaFormField
                                formHook={formHook}
                                fieldName='personalityText'
                                placeholder='AI generated text will appear here'
                                rows={9}
                            />
                        </div>
                    </StepContainer>
                    <StepButtons onPrevious={onPrevious} onNext={onNext} typing={typing} completed={completed} />
                </form>
            </Form>
        </>
    );
}
