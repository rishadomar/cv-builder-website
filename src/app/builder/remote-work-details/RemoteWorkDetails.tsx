import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { StepButtons } from '@/app/builder/StepButtons';
import { useAppSelector } from '@/lib/store/hooks';
import { useEffect } from 'react';
import { KeyValuePairArray } from '@/lib/type';
import YesNoFormField from '../YesNoFormField';
import { getStep } from '@/lib/utils/step';
import { StepContainer } from '@/components/StepContainer';
import { useSaveDataMutation } from '@/lib/store/api/databaseApiSlice';

const remoteworkDetailsFormSchema = z.object({
    remoteWork: z.enum(['yes', 'no'], {
        required_error: 'You need to select an option.'
    }),
    partiallyRemote: z.enum(['yes', 'no'], {
        required_error: 'You need to select an option.'
    }),
    preferRemote: z.enum(['yes', 'no'], {
        required_error: 'You need to select an option.'
    })
});

type RemoteWorkDetailsFormValues = z.infer<typeof remoteworkDetailsFormSchema>;

type RemoteWorkDetailsFormProps = {
    onNext: () => void;
    onPrevious: () => void;
};

export default function RemoteWorkDetailsForm({ onNext, onPrevious }: RemoteWorkDetailsFormProps) {
    const allFieldValues = useAppSelector((state) => state.fieldValues);
    const formHook = useForm<RemoteWorkDetailsFormValues>({
        resolver: zodResolver(remoteworkDetailsFormSchema)
    });
    const [saveData] = useSaveDataMutation();
    const { isDirty } = formHook.formState;
    const step = getStep('remote-work-details');

    useEffect(() => {
        if (allFieldValues) {
            formHook.reset({
                remoteWork: allFieldValues.remoteWork,
                partiallyRemote: allFieldValues.partiallyRemote,
                preferRemote: allFieldValues.preferRemote
            });
        }
    }, [allFieldValues, formHook]);

    const onSubmit = async (event?: React.BaseSyntheticEvent) => {
        event?.preventDefault(); // Prevent form submission immediately

        const submitter = (event?.nativeEvent as SubmitEvent).submitter;
        const submitterName =
            submitter instanceof HTMLButtonElement || submitter instanceof HTMLInputElement
                ? submitter.name
                : undefined;

        const saveValues = async (data: unknown) => {
            if (isDirty) {
                await saveData({ data: data as KeyValuePairArray }).unwrap();
            }
        };

        if (onNext && submitterName === 'next') {
            formHook.handleSubmit(async (data: RemoteWorkDetailsFormValues) => {
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

    return (
        <Form {...formHook}>
            <form onSubmit={onSubmit}>
                <StepContainer step={step}>
                    <YesNoFormField
                        formHook={formHook}
                        label='Are you prepared to work remotely?'
                        fieldName='remoteWork'
                    />
                    <YesNoFormField
                        formHook={formHook}
                        label='Are you prepared to work partially remotely?'
                        fieldName='partiallyRemote'
                    />
                    <YesNoFormField formHook={formHook} label='Do you prefer remote work?' fieldName='preferRemote' />
                </StepContainer>

                <StepButtons onPrevious={onPrevious} onNext={onNext} />
            </form>
        </Form>
    );
}
