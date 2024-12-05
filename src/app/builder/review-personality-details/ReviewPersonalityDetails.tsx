import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { save } from '@/lib/services';
import { Button } from '@/components/ui/button';
import { KeyValuePairArray } from '@/lib/type';
import TextareaFormField from '../TextareaFormField';
import { StepButtons } from '../StepButtons';
import PillSelectFormField from '../PillSelectFormField';
import { RefreshCw, Sparkles, Wand2 } from 'lucide-react';
import { getStep } from '@/lib/utils/step';
import StepHeader from '../StepHeader';
import { LucideIcon } from 'lucide-react';
import { setFieldValue } from '@/lib/store/fieldValues/fieldValuesSlice';
import { CompareText, CompareTextState } from '@/components/compareText/CompareText';
import { useGeneratePersonalityTextMutation, useImprovePersonalityTextMutation } from '@/lib/store/api/aiApiSlice';

const reviewPersonalityDetailsFormSchema = z.object({
    personalityTraits: z.array(z.string()).min(1, 'At least one description is required').default([]),
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
    const watchedPersonalityTraits = formHook.watch('personalityTraits');
    const watchedPersonalityText = formHook.watch('personalityText');
    const step = getStep('personality-details');
    const [compareText, setCompareText] = useState<CompareTextState>();
    const [generatePersonalityText, { isLoading: isGeneratingPersonalityText }] = useGeneratePersonalityTextMutation();
    const [improvePersonalityText, { isLoading: isImprovingPersonalityText }] = useImprovePersonalityTextMutation();

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

    const generateAiText = async () => {
        try {
            const result = await generatePersonalityText({ traits: watchedPersonalityTraits }).unwrap();
            if (watchedPersonalityText && watchedPersonalityText.length > 0) {
                setCompareText({
                    previousText: watchedPersonalityText,
                    newText: result,
                    onAccept: (acceptedText: string) => {
                        dispatch(setFieldValue({ field: 'personalityText', value: acceptedText }));
                        setCompareText(undefined);
                    },
                    onReject: () => {
                        setCompareText(undefined);
                    }
                });
            } else {
                dispatch(setFieldValue({ field: 'personalityText', value: result }));
            }
        } catch {}
    };

    const improveAiText = async () => {
        try {
            const newText = await improvePersonalityText({
                traits: watchedPersonalityTraits,
                previousText: watchedPersonalityText
            }).unwrap();
            if (watchedPersonalityText && watchedPersonalityText.length > 0) {
                setCompareText({
                    previousText: watchedPersonalityText,
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
        } catch {}
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
                                selectedPills={watchedPersonalityTraits}
                                setSelectedPills={(selectedPills) => {
                                    formHook.setValue('personalityTraits', selectedPills);
                                }}
                                customPills={{
                                    allow: true,
                                    placeholder: 'Add custom trait'
                                }}
                                error={formHook.formState.errors.personalityTraits?.message}
                            />
                            <TextareaFormField
                                formHook={formHook}
                                fieldName='personalityText'
                                placeholder='AI generated text will appear here'
                                rows={watchedPersonalityText && watchedPersonalityText.length > 0 ? 10 : 3}
                            />
                            <div className='flex flex-col md:flex-row justify-end gap-2 mt-4'>
                                <Button
                                    variant='outline'
                                    disabled={isGeneratingPersonalityText}
                                    onClick={() => generateAiText()}
                                >
                                    {watchedPersonalityText && watchedPersonalityText.length > 0 ? (
                                        <RefreshCw className='mr-2 h-5 w-5' />
                                    ) : (
                                        <Sparkles className='mr-2 h-5 w-5' />
                                    )}
                                    {watchedPersonalityText && watchedPersonalityText.length > 0
                                        ? 'Generate new text with AI'
                                        : 'Generate text with AI'}
                                </Button>
                                <Button
                                    variant='outline'
                                    disabled={
                                        isImprovingPersonalityText ||
                                        !watchedPersonalityText ||
                                        watchedPersonalityText.length === 0
                                    }
                                    onClick={() => improveAiText()}
                                >
                                    <Wand2 className='mr-2 h-5 w-5' />
                                    Improve with AI
                                </Button>
                            </div>{' '}
                        </div>
                    </div>
                    <StepButtons onNext={onNext} onPrevious={onPrevious} />
                </form>
            </Form>
            {/* {error && <div>Error: {error as string}</div>} */}
            {compareText && <CompareText isOpen={true} setIsOpen={() => setCompareText(undefined)} {...compareText} />}
        </>
    );
}
