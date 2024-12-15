import { FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import YearFormField from '@/app/builder/YearFormField';
import MonthFormField from '@/app/builder/MonthFormField';
import { FieldError } from 'react-hook-form';
import { FieldLayout } from '@/lib/type';

interface YearMonthFormFieldProps {
    formHook: any;
    label: string;
    fieldName: string;
    description?: string;
    errorYear?: FieldError;
    errorMonth?: FieldError;
    fieldLayout?: FieldLayout;
}

export default function YearMonthFormField({
    formHook,
    label,
    fieldName,
    description,
    errorYear,
    errorMonth,
    fieldLayout = 'default'
}: YearMonthFormFieldProps) {
    const renderFields = () => (
        <>
            <YearFormField formHook={formHook} label='Year' fieldName={`${fieldName}.year`} error={errorYear} />
            <MonthFormField formHook={formHook} label='Month' fieldName={`${fieldName}.month`} error={errorMonth} />
        </>
    );

    return (
        <FormField
            control={formHook.control}
            name={fieldName}
            render={() => (
                <FormItem>
                    {fieldLayout === 'default' ? (
                        <>
                            <FormLabel>{label}</FormLabel>
                            <div className={'flex flex-row gap-3'}>{renderFields()}</div>
                        </>
                    ) : (
                        <>
                            <div className={'flex flex-row gap-3 items-center'}>
                                <FormLabel>{label}</FormLabel>
                                {renderFields()}
                            </div>
                        </>
                    )}
                    {description && <FormDescription>{description}</FormDescription>}
                </FormItem>
            )}
        />
    );
}
