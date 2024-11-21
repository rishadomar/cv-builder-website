import React from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { CheckIcon, ClockIcon } from 'lucide-react';
import PaystackButton from '@/components/PaystackButton';
import { paymentComplete } from '@/lib/services/paymentService';
import { Button } from '@/components/ui/button';
import { Icons } from './icons';
import { Cost } from '@/constants';
import { Currency } from 'react-paystack/dist/types';
import PaystackSecurity from './PaystackSecurity';

const features = [
    'Full CV creation and management',
    'Professional template access',
    'One year of unlimited editing',
    'Secure document storage',
    'Download and print options'
];

type PaymentPromptProps = {
    onNext: () => void;
    onPrevious: () => void;
};

export function PaymentPrompt({ onNext, onPrevious }: PaymentPromptProps) {
    const dispatch = useAppDispatch();
    const authentication = useAppSelector((state) => state.authentication);
    const onSuccess = async (response: any) => {
        console.log('Paystack payment modal response', response);
        await dispatch(paymentComplete(Cost.currency as Currency, Cost.amount, response.reference));
    };

    return (
        <div className='space-y-4'>
            <div className='text-center mb-4'>
                <span className='text-3xl font-bold text-gray-900'>R59</span>
                <span className='text-gray-600 ml-2'>/ 1 Year Access</span>
            </div>

            <div className='space-y-3'>
                {features.map((feature, index) => (
                    <div key={index} className='flex items-center space-x-2 text-gray-700'>
                        <CheckIcon className='w-5 h-5 text-green-500' />
                        <span>{feature}</span>
                    </div>
                ))}
            </div>

            <div className='flex items-center text-sm text-gray-600 mt-4'>
                <ClockIcon className='w-4 h-4 mr-2' />
                <span>Access valid for 12 months from purchase date</span>
            </div>

            <div className='flex space-x-4'>
                <Button variant='outline' onClick={() => onPrevious()}>
                    <Icons.chevronLeft className='mr-2 h-4 w-4' />
                    Back
                </Button>

                <PaystackButton
                    label='Pay now'
                    options={{
                        email: authentication.email!,
                        currency: Cost.currency as Currency,
                        amount: Cost.amount,
                        reference: `payment_${new Date().getTime().toString()}`
                    }}
                    onSuccess={async (response) => {
                        console.log(response);
                        await onSuccess(response);
                        onNext();
                    }}
                    onClose={() => {
                        console.log('closed');
                    }}
                />
            </div>

            <PaystackSecurity />

            <div className='mt-6 text-center text-sm text-gray-500'>
                <p>
                    Need help?{' '}
                    <a href='/faqs' className='text-primary underline'>
                        Read our FAQs
                    </a>
                </p>
            </div>
        </div>
    );
}
