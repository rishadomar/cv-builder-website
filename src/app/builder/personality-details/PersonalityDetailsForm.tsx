import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { useAppSelector } from '@/lib/store/hooks';
import { Button } from '@/components/ui/button';
import { KeyValuePairArray } from '@/lib/type';
import TextareaFormField from '../TextareaFormField';
import { StepButtons } from '../StepButtons';
import PillSelectFormField from '../PillSelectFormField';
import { Sparkles } from 'lucide-react';
import { getStep } from '@/lib/utils/step';
import { CompareText, CompareTextState } from '@/components/compareText/CompareText';
import { useGeneratePersonalityTextMutation, useImprovePersonalityTextMutation } from '@/lib/store/api/aiApiSlice';
import { StepContainer } from '@/components/StepContainer';
import ImproveWithAIButton from '@/components/ImproveWithAIButton';
import { useSaveDataMutation } from '@/lib/store/api/databaseApiSlice';

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

export default function PersonalityDetailsForm({ onNext, onPrevious }: PersonalityDetailsFormProps) {
    const allFieldValues = useAppSelector((state) => state.fieldValues);
    const defaultValues: Partial<PersonalityDetailsFormValues> = {
        personalityTraits: [],
        personalityText: ''
    };
    const [saveData] = useSaveDataMutation();
    const formHook = useForm<PersonalityDetailsFormValues>({
        resolver: zodResolver(personalityDetailsFormSchema),
        defaultValues
    });
    const watchedPersonalityTraits = formHook.watch('personalityTraits');
    const watchedPersonalityText = formHook.watch('personalityText');
    const { isDirty } = formHook.formState;
    const step = getStep('personality-details');
    const [compareText, setCompareText] = useState<CompareTextState>();
    const [generatePersonalityText, { isLoading: isGeneratingPersonalityText }] = useGeneratePersonalityTextMutation();
    const [improvePersonalityText, { isLoading: isImprovingPersonalityText }] = useImprovePersonalityTextMutation();

    useEffect(() => {
        if (allFieldValues) {
            formHook.reset({
                personalityTraits: allFieldValues.personalityTraits,
                personalityText: allFieldValues.personalityText || ''
            });
        }
    }, [allFieldValues, formHook]);

    const onSubmit = async (event?: React.BaseSyntheticEvent) => {
        event?.preventDefault(); // Prevent form submission immediately

        const submitter = (event?.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
        const submitterName = submitter?.name;

        const saveValues = async (data: unknown) => {
            if (isDirty) {
                await saveData({ data: data as KeyValuePairArray }).unwrap();
            }
        };

        if (onNext && submitterName === 'next') {
            formHook.handleSubmit(async (data: PersonalityDetailsFormValues) => {
                await saveValues(data);
                onNext();
            })();
        } else if (onPrevious && submitterName === 'previous') {
            const data = formHook.getValues();
            await saveValues(data);
            onPrevious();
        }

        event?.preventDefault();
    };

    const generateAiText = async () => {
        const newText = await generatePersonalityText({ traits: watchedPersonalityTraits }).unwrap();
        formHook.setValue('personalityText', newText, {
            shouldValidate: true,
            shouldDirty: true
        });
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
                            selectedPills={watchedPersonalityTraits}
                            customPills={{
                                allow: true,
                                placeholder: 'Add custom trait'
                            }}
                            error={formHook.formState.errors.personalityTraits?.message}
                        />
                        {!watchedPersonalityTraits ||
                            (watchedPersonalityTraits.length === 0 && (
                                <small className='text-gray-500'>
                                    Select the personality traits that best describe the person you are. You can also
                                    add custom traits. The AI will generate text based on these traits.
                                </small>
                            ))}
                        {watchedPersonalityText?.length === 0 && (
                            <div className='flex flex-col md:flex-row justify-end gap-2 mt-4'>
                                <Button
                                    variant='outline'
                                    disabled={watchedPersonalityTraits?.length === 0 || isGeneratingPersonalityText}
                                    onClick={() => generateAiText()}
                                >
                                    <Sparkles className='mr-2 h-5 w-5' />
                                    Generate text with AI
                                </Button>
                            </div>
                        )}
                        <div className='relative'>
                            <TextareaFormField
                                formHook={formHook}
                                fieldName='personalityText'
                                placeholder='AI generated text will appear here'
                                rows={watchedPersonalityText?.length > 0 ? 10 : 3}
                            />
                            <ImproveWithAIButton
                                isBusyImproving={isGeneratingPersonalityText || isImprovingPersonalityText}
                                disabled={!watchedPersonalityText || watchedPersonalityText.length === 0}
                                isDirty={isDirty}
                                onClick={async () => {
                                    const newDescription = await improvePersonalityText({
                                        traits: watchedPersonalityTraits,
                                        previousText: watchedPersonalityText
                                    }).unwrap();
                                    setCompareText({
                                        previousText: watchedPersonalityText,
                                        newText: newDescription,
                                        onAccept: (acceptedText: string) => {
                                            formHook.setValue('personalityText', acceptedText, {
                                                shouldValidate: true,
                                                shouldDirty: true
                                            });
                                            setCompareText(undefined);
                                        },
                                        onReject: () => {
                                            setCompareText(undefined);
                                        }
                                    });
                                }}
                            />
                        </div>
                    </StepContainer>
                    <StepButtons onNext={onNext} onPrevious={onPrevious} />
                </form>
            </Form>
            {compareText && <CompareText isOpen={true} setIsOpen={() => setCompareText(undefined)} {...compareText} />}
        </>
    );
}
