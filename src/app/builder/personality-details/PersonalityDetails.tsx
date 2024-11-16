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

const personalityDetailsFormSchema = z.object({
    descriptionOfSelf: z.array(z.string()).min(1, 'At least one description is required').default([]),
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

    useEffect(() => {
        if (allFieldValues) {
            formHook.reset({
                descriptionOfSelf: allFieldValues.descriptionOfSelf || [],
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
                <StepButtons onNext={onNext} onPrevious={onPrevious} />
            </form>
        </Form>
    );
}
