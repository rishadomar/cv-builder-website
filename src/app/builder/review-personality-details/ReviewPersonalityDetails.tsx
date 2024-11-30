import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { save } from '@/lib/services';
import { Button } from '@/components/ui/button';
import { generatePersonalityText } from '@/lib/services/aiService';
import { KeyValuePairArray } from '@/lib/type';
import TextareaFormField from '../TextareaFormField';
import { StepButtons } from '../StepButtons';
import PillSelectFormField from '../PillSelectFormField';
import { WandSparkles } from 'lucide-react';
import { getStep } from '@/lib/utils/step';
import StepHeader from '../StepHeader';
import { LucideIcon } from 'lucide-react';
import { setFieldValue } from '@/lib/store/fieldValues/fieldValuesSlice';
import { CompareText } from '@/components/compareText/CompareText';

const reviewPersonalityDetailsFormSchema = z.object({
    personalityTraits: z.array(z.string()).min(1, 'At least one description is required').default([]),
    personalityText: z.string().default('')
});

type ReviewPersonalityDetailsFormValues = z.infer<typeof reviewPersonalityDetailsFormSchema>;

type ReviewPersonalityDetailsFormProps = {
    onNext?: () => void;
    onPrevious: () => void;
};

type CompareTextState = {
    previousText: string;
    newText: string;
    onAccept: (acceptedText: string) => void;
    onReject: () => void;
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
    const step = getStep('personality-details');
    const [compareText, setCompareText] = useState<CompareTextState>();

    useEffect(() => {
        console.log('all field values changed: ', allFieldValues);
        if (allFieldValues) {
            formHook.reset({
                personalityTraits: allFieldValues.personalityTraits || [],
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

    console.log('allFieldValues personalityText: ', allFieldValues.personalityText);

    const generateAiText = async () => {
        const data = formHook.getValues();
        const newText = await dispatch(generatePersonalityText(data.personalityTraits, data.personalityText));
        console.log('newText: ', newText);
        console.log('data.personalityText: ', data.personalityText);
        if (data.personalityText && data.personalityText.length > 0) {
            setCompareText({
                previousText: data.personalityText,
                newText: newText,
                onAccept: (acceptedText: string) => {
                    dispatch(setFieldValue({ field: 'personalityText', value: acceptedText }));
                    setCompareText(undefined);
                },
                onReject: () => {
                    setCompareText(undefined);
                }
            });
        } else {
            dispatch(setFieldValue({ field: 'personalityText', value: newText }));
        }
    };

    return (
        <>
            <Form {...formHook}>
                <form onSubmit={onSubmit}>
                    <div className='h-[calc(100vh-theme(spacing.16)-theme(spacing.20))] overflow-y-auto'>
                        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6'>
                            <StepHeader icon={step?.icon as LucideIcon} title={step?.title ?? ''} />

                            <PillSelectFormField
                                fieldName='personalityTraits'
                                availablePills={Traits}
                                selectedPills={formHook.getValues().personalityTraits}
                                setSelectedPills={(selectedPills) => {
                                    formHook.reset({
                                        personalityTraits: selectedPills
                                    });
                                }}
                                customPills={{
                                    allow: true,
                                    placeholder: 'Add custom trait'
                                }}
                                error={formHook.formState.errors.personalityTraits?.message}
                            />
                            <Button
                                className='w-full'
                                variant='outline'
                                disabled={isLoading}
                                onClick={() => generateAiText()}
                            >
                                <WandSparkles className='mr-2 h-5 w-5' />
                                {allFieldValues.personalityText && allFieldValues.personalityText.length > 0
                                    ? 'Re-generate'
                                    : 'Generate'}
                            </Button>
                            <TextareaFormField
                                formHook={formHook}
                                label='Generated Text'
                                fieldName='personalityText'
                                placeholder='AI generated text will appear here'
                                rows={10}
                            />
                        </div>
                    </div>
                    <StepButtons onNext={onNext} onPrevious={onPrevious} />
                </form>
            </Form>
            {compareText && <CompareText isOpen={true} setIsOpen={() => setCompareText(undefined)} {...compareText} />}
        </>
    );
}
