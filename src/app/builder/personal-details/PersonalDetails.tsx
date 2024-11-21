import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { StepButtons } from '../StepButtons';
import TextFormField from '../TextFormField';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { save } from '@/lib/services';
import YesNoFormField from '@/app/builder/YesNoFormField';
import { KeyValuePairArray } from '@/lib/type';
import StepHeader from '../StepHeader';
import { LucideIcon } from 'lucide-react';
import { getStep } from '@/lib/utils/step';

const personalDetailsFormSchema = z.object({
    preferredPronoun: z
        .string()
        .min(2, {
            message: 'Preferred pronoun must be at least 2 characters.'
        })
        .default(''),
    excludeGender: z.enum(['yes', 'no'], {
        required_error: 'You need to select an option.'
    })
});

type PersonalDetailsFormValues = z.infer<typeof personalDetailsFormSchema>;

type PersonalDetailsFormProps = {
    onNext?: () => void;
    onPrevious: () => void;
};

export default function PersonalDetailsForm({ onNext, onPrevious }: PersonalDetailsFormProps) {
    const dispatch = useAppDispatch();
    const allFieldValues = useAppSelector((state) => state.fieldValues);
    const formHook = useForm<PersonalDetailsFormValues>({
        resolver: zodResolver(personalDetailsFormSchema)
    });
    const step = getStep('personal-details');

    useEffect(() => {
        if (allFieldValues) {
            formHook.reset({
                preferredPronoun: allFieldValues.preferredPronoun,
                excludeGender: allFieldValues.excludeGender
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
            formHook.handleSubmit((data: PersonalDetailsFormValues) => {
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
        <>
            <Form {...formHook}>
                <form onSubmit={onSubmit}>
                    <div className='h-[calc(100vh-theme(spacing.16)-theme(spacing.20))] overflow-y-auto'>
                        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6'>
                            <StepHeader icon={step?.icon as LucideIcon} title={step?.title ?? ''} />
                            <TextFormField
                                formHook={formHook}
                                label='Preferred pronoun'
                                fieldName='preferredPronoun'
                                description='Enter she/her, he/him, they/them.'
                                placeholder='Your preferred pronoun'
                            />
                            <YesNoFormField
                                formHook={formHook}
                                label='Exclude my gender details from my CV?'
                                fieldName='excludeGender'
                            />
                        </div>
                    </div>
                    <StepButtons onNext={onNext} onPrevious={onPrevious} />
                </form>
            </Form>
        </>
    );
}
