import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { save } from '@/lib/services';
import { Button } from '@/components/ui/button';
import { generatePersonalityText } from '@/lib/services/aiService';
import { Icons } from '@/components/icons';
import { KeyValuePairArray } from '@/lib/type';
import TextareaFormField from '../TextareaFormField';
import { StepButtons } from '../StepButtons';
import TextFormField from '../TextFormField';
import PillSelectFormField from '../PillSelectFormField';

const reviewPersonalityDetailsFormSchema = z.object({
    descriptionOfSelf: z.array(z.string()).min(1, 'At least one description is required').default([]),
    otherTraits: z.string().default(''),
    personalityText: z.string().default('')
});

type ReviewPersonalityDetailsFormValues = z.infer<typeof reviewPersonalityDetailsFormSchema>;

type ReviewPersonalityDetailsFormProps = {
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

export default function ReviewPersonalityDetailsForm({ onNext, onPrevious }: ReviewPersonalityDetailsFormProps) {
    const dispatch = useAppDispatch();
    const allFieldValues = useAppSelector((state) => state.fieldValues);
    const formHook = useForm<ReviewPersonalityDetailsFormValues>({
        resolver: zodResolver(reviewPersonalityDetailsFormSchema)
    });
    const isLoading = useAppSelector((state) => state.loading.isLoading);

    useEffect(() => {
        console.log('all field values changed: ', allFieldValues);
        if (allFieldValues) {
            formHook.reset({
                descriptionOfSelf: allFieldValues.descriptionOfSelf || [],
                otherTraits: allFieldValues.otherTraits || '',
                personalityText: allFieldValues.personalityText || ''
            });
        }
    }, [allFieldValues, formHook]);

    const onSubmit = async (event?: React.BaseSyntheticEvent) => {
        const submitter = (event?.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
        const submitterName = submitter?.name;

        const saveValues = (data: unknown) => {
            dispatch(save(data as KeyValuePairArray));
        };

        if (onNext && submitterName === 'next') {
            formHook.handleSubmit((data: ReviewPersonalityDetailsFormValues) => {
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

    const generateAiText = async () => {
        const data = formHook.getValues();
        dispatch(generatePersonalityText(data.descriptionOfSelf));
    };

    return (
        <>
            <Form {...formHook}>
                <h2>Personality details</h2>
                <form onSubmit={onSubmit} className='flex flex-col space-y-4'>
                    <div className='h-[500px] overflow-auto space-y-4 px-2'>
                        <PillSelectFormField
                            label='Personality Traits'
                            fieldName='descriptionOfSelf'
                            availablePills={Traits}
                            selectedPills={formHook.getValues().descriptionOfSelf}
                            setSelectedPills={(selectedPills) => {
                                formHook.reset({
                                    descriptionOfSelf: selectedPills
                                });
                            }}
                            error={formHook.formState.errors.descriptionOfSelf?.message}
                        />
                    </div>
                    <TextFormField formHook={formHook} label='Other Traits' fieldName='otherTraits' />
                    <Button variant='outline' disabled={isLoading} onClick={() => generateAiText()}>
                        <Icons.sparkles className='mr-2 h-5 w-5' />
                        Generate
                    </Button>
                    <TextareaFormField
                        formHook={formHook}
                        label='Generated Text'
                        fieldName='personalityText'
                        placeholder='AI generated text will appear here'
                    />
                    <StepButtons onNext={onNext} onPrevious={onPrevious} />
                </form>
            </Form>
        </>
    );
}
