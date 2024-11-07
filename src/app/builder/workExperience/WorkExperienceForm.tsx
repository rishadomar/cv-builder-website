import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import TextFormField from '@/app/builder/TextFormField';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { addWorkExperience, updateWorkExperience } from '@/lib/services';
import { WorkExperienceEntry } from '@/lib/type';
import YearMonthFormField from '@/app/builder/YearMonthFormField';
import { Button } from '@/components/ui/button';
import TextareaFormField from '@/app/builder/TextareaFormField';
import { useToast } from '@/hooks/use-toast';

const workExperienceDetailsFormSchema = z.object({
    company: z
        .string()
        .min(2, {
            message: 'Company must be at least 2 characters.'
        })
        .default(''),
    startDate: z
        .object({
            year: z.string(),
            month: z.string()
        })
        .default({ year: '2000', month: 'January' }),
    endDate: z
        .object({
            year: z.string(),
            month: z.string()
        })
        .optional(),
    location: z
        .string()
        .min(2, {
            message: 'Location must be at least 2 characters.'
        })
        .default(''),
    role: z
        .string()
        .min(2, {
            message: 'Role must be at least 2 characters.'
        })
        .default(''),
    description: z
        .string()
        .min(2, {
            message: 'Description must be at least 2 characters.'
        })
        .default('')
});

type WorkExperienceDetailsFormValues = z.infer<typeof workExperienceDetailsFormSchema>;

interface WorkExperienceFormProps {
    workExperienceEntryToEdit?: WorkExperienceEntry;
    setBusyUpdating: (v: boolean) => void;
    onClose: () => void;
}

export default function WorkExperienceForm({
    workExperienceEntryToEdit,
    setBusyUpdating,
    onClose
}: WorkExperienceFormProps) {
    const dispatch = useAppDispatch();
    const { toast } = useToast();
    const defaultValues: Partial<WorkExperienceDetailsFormValues> = {
        company: workExperienceEntryToEdit?.company || '',
        startDate: workExperienceEntryToEdit?.startDate || { year: '2000', month: 'January' },
        endDate: workExperienceEntryToEdit?.endDate || undefined,
        location: workExperienceEntryToEdit?.location || '',
        role: workExperienceEntryToEdit?.role || '',
        description: workExperienceEntryToEdit?.description || ''
    };
    const formHook = useForm<WorkExperienceDetailsFormValues>({
        resolver: zodResolver(workExperienceDetailsFormSchema),
        defaultValues
    });
    const isLoading = useAppSelector((state) => state.loading.isLoading);

    function onSubmit(event?: React.BaseSyntheticEvent) {
        const saveValues = async (data: WorkExperienceDetailsFormValues) => {
            try {
                console.log('Set busy adding to true', data);
                setBusyUpdating(true);
                if (workExperienceEntryToEdit) {
                    await dispatch(
                        updateWorkExperience({ ...(data as WorkExperienceEntry), id: workExperienceEntryToEdit.id })
                    );
                } else {
                    await dispatch(addWorkExperience(data as WorkExperienceEntry));
                }
                onClose();
                toast({
                    title: 'WorkExperienceEntry',
                    description: 'Successfully saved'
                });
            } catch (error) {
                console.error('Error saving work experience', error);
                toast({
                    variant: 'destructive',
                    title: 'WorkExperienceEntry',
                    description: 'Failed to save'
                });
            } finally {
                console.log('Set busy adding to false');
                setBusyUpdating(false);
            }
        };

        formHook.handleSubmit((data: WorkExperienceDetailsFormValues) => {
            saveValues(data);
        })();

        event?.preventDefault();
    }

    return (
        <Form {...formHook}>
            {/* {busySaving && <OverlaySpinner />} */}
            {/* <h2>Location details</h2> */}
            <form onSubmit={onSubmit} className='flex flex-col bg-white'>
                <div className='h-[500px] overflow-auto space-y-4 px-2'>
                    <TextFormField formHook={formHook} label='Company' fieldName='company' placeholder='Company name' />
                    <YearMonthFormField formHook={formHook} label='Start date' fieldName='startDate' />
                    <YearMonthFormField formHook={formHook} label='End date' fieldName='endDate' />
                    <TextFormField
                        formHook={formHook}
                        label='Role'
                        fieldName='role'
                        placeholder='Eg. Intern, Software Engineer'
                    />
                    <TextFormField
                        formHook={formHook}
                        label='Location'
                        fieldName='location'
                        placeholder='Eg. Lagos, Nigeria'
                    />
                    <TextareaFormField
                        formHook={formHook}
                        label='Description'
                        fieldName='description'
                        placeholder='Eg. I was responsible for...'
                    />
                </div>
                <div className='mt-4 flex justify-end'>
                    <Button type='submit' disabled={isLoading}>
                        Save
                    </Button>
                </div>
            </form>
        </Form>
    );
}
