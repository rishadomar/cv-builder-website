import * as React from 'react';
import { FormDescription, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { FieldError } from 'react-hook-form';

interface MonthFormFieldProps {
    formHook: any;
    label: string;
    fieldName: string;
    description?: string;
    error?: FieldError;
}

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

export default function MonthFormField({ formHook, label, fieldName, description, error }: MonthFormFieldProps) {
    return (
        <FormField
            control={formHook.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem>
                    <div className='flex items-center'>
                        <FormLabel className='sr-only'>{label}</FormLabel>
                        <FormControl>
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className='w-[120px]'>
                                    <SelectValue placeholder={label} />
                                </SelectTrigger>
                                <SelectContent className='max-h-[300px] overflow-y-auto'>
                                    <SelectGroup>
                                        <SelectLabel>Month</SelectLabel>
                                        {months.map((month, index) => (
                                            <SelectItem key={month} value={index.toString()}>
                                                {month}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </FormControl>
                    </div>
                    {description && <FormDescription>{description}</FormDescription>}
                    {error && <FormMessage className='text-xs text-red-500'>{error.message}</FormMessage>}
                </FormItem>
            )}
        />
    );
}
