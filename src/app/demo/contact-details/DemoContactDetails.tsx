'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { z } from 'zod';
import { StepButtons } from '@/app/demo/StepButtons';
import TextFormField from '@/app/builder/TextFormField';
import { getStep } from '@/lib/utils/step';
import { StepContainer } from '@/components/StepContainer';
import { useTypewriterEffect } from '@/hooks/useTypewriterEffect';

const PhoneNumberRegex = /^(\+?\d{1,3})?[\s-]?(\(?\d{1,4}\)?)?[\s-]?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,9}$/;

const contactDetailsFormSchema = z.object({
    name: z.string().default(''),
    professionalTitle: z.string().default(''),
    phoneNumber: z.string().default('')
});

type ContactDetailsFormValues = z.infer<typeof contactDetailsFormSchema>;

type ContactDetailsFormProps = {
    onNext?: () => void;
    onPrevious?: () => void;
};

export default function DemoContactDetailsForm({ onNext, onPrevious }: ContactDetailsFormProps) {
    const formHook = useForm<ContactDetailsFormValues>({
        resolver: zodResolver(contactDetailsFormSchema)
    });
    const step = getStep('contact-details');

    // Define demo data
    const demoData = {
        name: 'Thabo Mokwena',
        professionalTitle: 'Chef de Cuisine',
        phoneNumber: '+27 82 123 4567'
    };

    // Use the improved hook
    const { typing, completed } = useTypewriterEffect(formHook, demoData, {
        initialDelay: 1000,
        typeDelay: 50,
        fieldDelay: 800,
        onComplete: () => {
            console.log('All fields filled!');
        }
    });

    const onSubmit = async (event?: React.BaseSyntheticEvent) => {
        event?.preventDefault(); // Prevent form submission immediately

        const submitter = (event?.nativeEvent as SubmitEvent).submitter;
        const submitterName =
            submitter instanceof HTMLButtonElement || submitter instanceof HTMLInputElement
                ? submitter.name
                : undefined;

        if (onNext && submitterName === 'next') {
            formHook.handleSubmit(async (data: ContactDetailsFormValues) => {
                onNext();
            })();
        } else if (onPrevious && submitterName === 'previous') {
            const data = formHook.getValues();
            onPrevious();
        }

        event?.preventDefault();
    };
    console.log('typing', typing, 'Completed', completed);

    return (
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

                <StepButtons onNext={onNext} typing={typing} completed={completed} />
            </form>
        </Form>
    );
}
