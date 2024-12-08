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
interface YearFormFieldProps {
    formHook: any;
    label: string;
    fieldName: string;
    description?: string;
    error?: FieldError;
}

const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

export default function YearFormField({ formHook, label, fieldName, description, error }: YearFormFieldProps) {
    return (
        <FormField
            control={formHook.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem>
                    <div className='flex items-center'>
                        <FormLabel className='sr-only'>{label}</FormLabel>
                        <FormControl>
                            <Select
                                value={field.value?.toString()}
                                onValueChange={(value) => field.onChange(Number(value))}
                            >
                                <SelectTrigger className='w-[120px]'>
                                    <SelectValue placeholder={label} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Year</SelectLabel>
                                        {years.map((year) => (
                                            <SelectItem key={year} value={year.toString()}>
                                                {year.toString()}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </FormControl>
                    </div>
                    {description && <FormDescription>{description}</FormDescription>}
                    {error && (
                        <FormMessage className='text-xs text-red-500'>{error.message as React.ReactNode}</FormMessage>
                    )}
                </FormItem>
            )}
        />
    );
}
