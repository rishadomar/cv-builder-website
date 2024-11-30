import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { StepButtons } from '../StepButtons';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { save } from '@/lib/services';
import { useEffect } from 'react';
import PillSelectFormField from '../PillSelectFormField';
import TextFormField from '../TextFormField';
import { KeyValuePairArray } from '@/lib/type';
import { getStep } from '@/lib/utils/step';
import StepHeader from '../StepHeader';
import { LucideIcon } from 'lucide-react';

const personalityDetailsFormSchema = z.object({
    personalityTraits: z.array(z.string()).min(1, 'At least one description is required').default([]),
    otherTraits: z.string().default('')
});

type PersonalityDetailsFormValues = z.infer<typeof personalityDetailsFormSchema>;

type PersonalityDetailsFormProps = {
    onNext: () => void;
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
    const dispatch = useAppDispatch();
    const allFieldValues = useAppSelector((state) => state.fieldValues);
    const formHook = useForm<PersonalityDetailsFormValues>({
        resolver: zodResolver(personalityDetailsFormSchema)
    });
    const step = getStep('personality-details');

    useEffect(() => {
        if (allFieldValues) {
            formHook.reset({
                personalityTraits: allFieldValues.personalityTraits || [],
                otherTraits: allFieldValues.otherTraits || ''
            });
        }
    }, [allFieldValues, formHook]);

    function onSubmit(event?: React.BaseSyntheticEvent) {
        const submitter = (event?.nativeEvent as SubmitEvent).submitter;
        const submitterName =
            submitter instanceof HTMLButtonElement || submitter instanceof HTMLInputElement
                ? submitter.name
                : undefined;

        const saveValues = (data: unknown) => {
            dispatch(save(data as KeyValuePairArray));
        };

        if (onNext && submitterName === 'next') {
            formHook.handleSubmit((data: PersonalityDetailsFormValues) => {
                saveValues(data);
                onNext();
            })();
        } else if (onPrevious && submitterName === 'previous') {
            const data = formHook.getValues();
            saveValues(data);
            onPrevious();
        }

        event?.preventDefault();
    }

    return (
        <Form {...formHook}>
            <form onSubmit={onSubmit}>
                <div className='h-[calc(100vh-theme(spacing.16)-theme(spacing.20))] overflow-y-auto'>
                    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4'>
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
                            error={formHook.formState.errors.personalityTraits?.message}
                        />
                        <TextFormField formHook={formHook} label='Other Traits' fieldName='otherTraits' />
                    </div>
                </div>
                <StepButtons onNext={onNext} onPrevious={onPrevious} />
            </form>
        </Form>
    );
}
