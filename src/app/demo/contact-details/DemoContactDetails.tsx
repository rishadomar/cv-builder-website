'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { z } from 'zod';
import { StepButtons } from '@/app/demo/StepButtons';
import TextFormField from '@/app/builder/TextFormField';
import { StepContainer } from '@/components/StepContainer';
import { useTypewriterEffect } from '@/hooks/useTypewriterEffect';
import { getStep } from '@/lib/utils/demoStep';
import { useEffect, useRef } from 'react';
import { useCoachMark } from '@/hooks/useCoachMark';

const contactDetailsFormSchema = z.object({
    name: z.string().default(''),
    professionalTitle: z.string().default(''),
    phoneNumber: z.string().default('')
});

type ContactDetailsFormValues = z.infer<typeof contactDetailsFormSchema>;

type ContactDetailsFormProps = {
    onNext: () => void;
    onPrevious: () => void;
    onReturnToHome: () => void;
};

export default function DemoContactDetailsForm({ onNext, onPrevious, onReturnToHome }: ContactDetailsFormProps) {
    const nextButtonCoachMark = useCoachMark();
    const coachMarkRendered = useRef(false);

    const formHook = useForm<ContactDetailsFormValues>({
        resolver: zodResolver(contactDetailsFormSchema)
    });

    const step = getStep('contact-details');

    // Define demo data
    const demoData = {
        name: 'Thabo Mokwena',
        professionalTitle: 'Sous Chef',
        phoneNumber: '+27 82 123 4567'
    };

    // Use the typewriter effect hook
    const { typing, completed } = useTypewriterEffect(formHook, demoData, {
        initialDelay: 1000,
        typeDelay: 50,
        fieldDelay: 800
    });

    useEffect(() => {
        if (completed && !typing && !coachMarkRendered.current) {
            coachMarkRendered.current = true;
            nextButtonCoachMark.showCoachMark(
                'next-button', // ID of the element to highlight
                <div>
                    <p className='text-sm'>Contact details are complete!</p>
                    <p className='text-xs mt-1'>Click next to describe your personality</p>
                </div>
            );
        }
    }, [completed, typing, nextButtonCoachMark]);

    const onSubmit = async (event?: React.BaseSyntheticEvent) => {
        event?.preventDefault(); // Prevent form submission immediately

        const submitter = (event?.nativeEvent as SubmitEvent).submitter;
        const submitterName =
            submitter instanceof HTMLButtonElement || submitter instanceof HTMLInputElement
                ? submitter.name
                : undefined;

        if (onNext && submitterName === 'next') {
            formHook.handleSubmit(async () => {
                onNext();
            })();
        } else if (onPrevious && submitterName === 'previous') {
            onPrevious();
        }

        event?.preventDefault();
    };

    return (
        <>
            <Form {...formHook}>
                <form onSubmit={onSubmit}>
                    <StepContainer step={step}>
                        <TextFormField
                            formHook={formHook}
                            label='Name'
                            fieldName='name'
                            description='This is the name that will be displayed on your profile and in emails.'
                            placeholder='Your name'
                        />

                        <TextFormField
                            formHook={formHook}
                            label='Professional title'
                            fieldName='professionalTitle'
                            description='This is your current job title.'
                            placeholder='Your professional title'
                        />

                        <TextFormField
                            formHook={formHook}
                            label='Contact number'
                            fieldName='phoneNumber'
                            placeholder='Your contact number'
                        />
                    </StepContainer>

                    <StepButtons
                        onNext={onNext}
                        onPrevious={onPrevious}
                        typing={typing}
                        completed={completed}
                        onReturnToHome={onReturnToHome}
                    />
                </form>
            </Form>
            <nextButtonCoachMark.CoachMark />
        </>
    );
}
