import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { StepButtons } from '@/app/builder/StepButtons';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { save } from '@/lib/services';
import { useEffect } from 'react';
import { KeyValuePairArray } from '@/lib/type';
import YesNoFormField from '../YesNoFormField';

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
    const dispatch = useAppDispatch();
    const allFieldValues = useAppSelector((state) => state.fieldValues);
    const formHook = useForm<RemoteWorkDetailsFormValues>({
        resolver: zodResolver(remoteworkDetailsFormSchema)
    });

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
        const submitter = (event?.nativeEvent as SubmitEvent).submitter;
        const submitterName =
            submitter instanceof HTMLButtonElement || submitter instanceof HTMLInputElement
                ? submitter.name
                : undefined;

        const saveValues = (data: unknown) => {
            dispatch(save(data as KeyValuePairArray));
        };

        if (onNext && submitterName === 'next') {
            formHook.handleSubmit(async (data: RemoteWorkDetailsFormValues) => {
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
        <Form {...formHook}>
            <h2>RemoteWork details</h2>
            <form onSubmit={onSubmit} className='flex flex-col space-y-4'>
                <div className='h-[500px] overflow-auto space-y-4 px-2'>
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
                </div>

                <StepButtons onPrevious={onPrevious} onNext={onNext} className='mt-auto' />
            </form>
        </Form>
    );
}
