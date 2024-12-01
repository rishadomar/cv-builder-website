import { FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import YearFormField from '@/app/builder/YearFormField';
import MonthFormField from '@/app/builder/MonthFormField';
import { FieldError } from 'react-hook-form';

interface YearMonthFormFieldProps {
    formHook: any;
    label: string;
    fieldName: string;
    description?: string;
    errorYear?: FieldError;
    errorMonth?: FieldError;
}

export default function YearMonthFormField({
    formHook,
    label,
    fieldName,
    description,
    errorYear,
    errorMonth
}: YearMonthFormFieldProps) {
    return (
        <FormField
            control={formHook.control}
            name={fieldName}
            render={() => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <div className={'flex flex-col justify-between gap-3'}>
                        <YearFormField
                            formHook={formHook}
                            label='Year'
                            fieldName={`${fieldName}.year`}
                            error={errorYear}
                        />
                        <MonthFormField
                            formHook={formHook}
                            label='Month'
                            fieldName={`${fieldName}.month`}
                            error={errorMonth}
                        />
                    </div>
                    {description && <FormDescription>{description}</FormDescription>}
                </FormItem>
            )}
        />
    );
}
