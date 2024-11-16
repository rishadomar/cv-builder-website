'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { z } from 'zod';
import { StepButtons } from '@/app/builder/StepButtons';
import TextFormField from '@/app/builder/TextFormField';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { save } from '@/lib/services';
import { useEffect } from 'react';
import { KeyValuePairArray } from '@/lib/type';

const PhoneNumberRegex = /^(\+?\d{1,3})?[\s-]?(\(?\d{1,4}\)?)?[\s-]?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,9}$/;

const contactDetailsFormSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: 'Name must be at least 2 characters.'
        })
        .max(60, {
            message: 'Name must not be longer than 60 characters.'
        })
        .default(''),
    phoneNumber: z
        .string()
        .regex(PhoneNumberRegex, {
            message: 'A valid phone number is required.'
        })
        .min(10, {
            message: 'Phone number must be at least 10 characters.'
        })
        .default('')
});

type ContactDetailsFormValues = z.infer<typeof contactDetailsFormSchema>;

type ContactDetailsFormProps = {
    onNext?: () => void;
    onPrevious?: () => void;
};

export default function ContactDetailsForm({ onNext, onPrevious }: ContactDetailsFormProps) {
    const dispatch = useAppDispatch();
    const allFieldValues = useAppSelector((state) => state.fieldValues);
    const formHook = useForm<ContactDetailsFormValues>({
        resolver: zodResolver(contactDetailsFormSchema)
    });

    useEffect(() => {
        if (allFieldValues) {
            formHook.reset({
                name: allFieldValues.name || '',
                phoneNumber: allFieldValues.phoneNumber || ''
            });
        }
    }, [allFieldValues, formHook]);

    const onSubmit = async (event?: React.BaseSyntheticEvent) => {
        const submitter = (event?.nativeEvent as SubmitEvent).submitter;
        const submitterName =
            submitter instanceof HTMLButtonElement || submitter instanceof HTMLInputElement
                ? submitter.name
                : undefined;

        const saveValues = (data: unknown) => {
            dispatch(save(data as KeyValuePairArray));
        };

        if (onNext && submitterName === 'next') {
            formHook.handleSubmit((data: ContactDetailsFormValues) => {
                saveValues(data);
                onNext();
            })();
        } else if (onPrevious && submitterName === 'previous') {
            const data = formHook.getValues();
            saveValues(data);
            onPrevious();
        }

        event?.preventDefault();
    };

    return (
        <Form {...formHook}>
            <h1 className='pl-4'>Contact details</h1>
            <form onSubmit={onSubmit}>
                <div className='h-[calc(100vh-theme(spacing.16)-theme(spacing.20))] overflow-y-auto'>
                    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6'>
                        <TextFormField
                            formHook={formHook}
                            label='Name'
                            fieldName='name'
                            description='This is the name that will be displayed on your profile and in emails.'
                            placeholder='Your name'
                        />

                        <TextFormField
                            formHook={formHook}
                            label='Contact number'
                            fieldName='phoneNumber'
                            placeholder='Your contact number'
                        />
                    </div>
                </div>

                <StepButtons onNext={onNext} />
            </form>
        </Form>
    );
}
