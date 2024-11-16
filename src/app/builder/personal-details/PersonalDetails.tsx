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
                <h1 className='m-3'>Personal details</h1>
                <form onSubmit={onSubmit} className='flex flex-col h-full'>
                    <div className='flex-grow overflow-auto space-y-4 px-3'>
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
                    <div className='my-4'>
                        <StepButtons onNext={onNext} onPrevious={onPrevious} />
                    </div>
                </form>
            </Form>
        </>
    );
}
