import { FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import YearFormField from '@/app/builder/YearFormField';
import MonthFormField from '@/app/builder/MonthFormField';
import { FieldError } from 'react-hook-form';
interface YearMonthFormFieldProps {
    form: any;
    label: string;
    fieldName: string;
    description?: string;
    errorYear?: FieldError;
    errorMonth?: FieldError;
}

export default function YearMonthFormField({
    form,
    label,
    fieldName,
    description,
    errorYear,
    errorMonth
}: YearMonthFormFieldProps) {
    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={() => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <div className={'flex flex-row justify-between'}>
                        <YearFormField form={form} label='Year' fieldName={`${fieldName}.year`} error={errorYear} />
                        <MonthFormField form={form} label='Month' fieldName={`${fieldName}.month`} error={errorMonth} />
                    </div>
                    {description && <FormDescription>{description}</FormDescription>}
                </FormItem>
            )}
        />
    );
}
