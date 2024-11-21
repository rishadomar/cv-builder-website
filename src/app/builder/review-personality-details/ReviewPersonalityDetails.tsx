import React, { useEffect } from 'react';
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
import TextFormField from '../TextFormField';
import PillSelectFormField from '../PillSelectFormField';
import { WandSparkles } from 'lucide-react';
import { getStep } from '@/lib/utils/step';
import StepHeader from '../StepHeader';
import { LucideIcon } from 'lucide-react';

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
    const step = getStep('personality-details');

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
        <Form {...formHook}>
            <form onSubmit={onSubmit}>
                <div className='h-[calc(100vh-theme(spacing.16)-theme(spacing.20))] overflow-y-auto'>
                    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6'>
                        <StepHeader icon={step?.icon as LucideIcon} title={step?.title ?? ''} />

                        <PillSelectFormField
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
                        <TextFormField formHook={formHook} label='Other Traits' fieldName='otherTraits' />
                        <Button variant='outline' disabled={isLoading} onClick={() => generateAiText()}>
                            <WandSparkles className='mr-2 h-5 w-5' />
                            Generate
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
    );
}
