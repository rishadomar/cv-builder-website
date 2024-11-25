import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Form validation schema
const formSchema = z.object({
    promoCode: z.string().min(1, 'Promo code is required')
});

export type PromoFormValues = z.infer<typeof formSchema>;

interface PromoCodeFormProps {
    onSubmit: (data: PromoFormValues) => Promise<void>;
}

export function PromoCodeForm({ onSubmit }: PromoCodeFormProps) {
    const form = useForm<PromoFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            promoCode: ''
        }
    });

    const handleSubmit = async (data: PromoFormValues) => {
        try {
            await onSubmit(data);
        } catch (error) {
            form.setError('promoCode', {
                type: 'manual',
                message: 'Invalid promo code'
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='flex items-center justify-center space-x-4'>
                <FormField
                    control={form.control}
                    name='promoCode'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-xs w-full'>
                                Have a promo code from one of our partner programs?
                            </FormLabel>
                            <div className='flex items-center space-x-4'>
                                <FormControl className='flex-grow'>
                                    <Input placeholder='Enter promo code' {...field} />
                                </FormControl>
                                <Button variant='outline' type='submit' className='flex-shrink-0'>
                                    <ArrowRight className='w-6 h-6' />
                                </Button>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}
