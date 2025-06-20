import React, { useEffect } from 'react';
import { useAppSelector } from '@/lib/store/hooks';
import { CheckIcon, ClockIcon } from 'lucide-react';
import PaystackButton from '@/components/PaystackButton';
import { Cost } from '@/constants';
import { Currency } from 'react-paystack/dist/types';
import { PromoCodeForm, PromoFormValues } from './PromoCodeForm';
import { StepButtons } from '@/app/builder/StepButtons';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { selectHasPromoCode } from '@/lib/store/fieldValues/fieldValuesSlice';
import { usePaymentCompleteMutation } from '@/lib/store/api/paymentApiSlice';
import { useApplyPromoCodeMutation } from '@/lib/store/api/paymentApiSlice';
import { PaymentInitiatedDialog } from './PaymentInitiatedDialog';

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
    const authentication = useAppSelector((state) => state.authentication);
    const [paymentModalComplete, setPaymentModalComplete] = React.useState(false);
    const router = useRouter();
    const hasPromoCode = useAppSelector(selectHasPromoCode);
    const [paymentComplete] = usePaymentCompleteMutation();
    const [applyPromoCode] = useApplyPromoCodeMutation();
    const [paymentInitiated, setPaymentInitiated] = React.useState(false);

    useEffect(() => {
        if (localStorage.getItem('payment-initiated')) {
            setPaymentInitiated(true);
        }
    }, []);

    const onSuccess = async (response: any) => {
        await paymentComplete({
            currency: Cost.currency as Currency,
            amount: Cost.amount,
            reference: response.reference
        }).unwrap();
        localStorage.removeItem('payment-initiated');
        setPaymentModalComplete(true);
    };

    const handlePromoSubmit = async (data: PromoFormValues) => {
        await applyPromoCode({ promoCode: data.promoCode }).unwrap();
    };

    return (
        <>
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
                    {paymentModalComplete ? (
                        <Button
                            onClick={onNext}
                            variant='outline'
                            className='flex items-center justify-center flex-grow py-2 rounded-lg'
                        >
                            Thank you for your support.
                        </Button>
                    ) : (
                        <>
                            <PaystackButton
                                label='Pay now'
                                options={{
                                    email: authentication.email!,
                                    currency: Cost.currency as Currency,
                                    amount: Cost.amount,
                                    reference: `payment_${new Date().getTime().toString()}`,
                                    metadata: {
                                        sub: authentication.sub
                                    }
                                }}
                                onSuccess={async (response) => {
                                    await onSuccess(response);
                                }}
                                onClose={() => {}}
                            />
                            {paymentInitiated && (
                                <PaymentInitiatedDialog
                                    isOpen={paymentInitiated}
                                    onOpenChange={(isOpen: boolean) => {
                                        setPaymentInitiated(isOpen);
                                        localStorage.removeItem('payment-initiated');
                                    }}
                                />
                            )}
                        </>
                    )}
                </div>

                {hasPromoCode ? (
                    <div className='border border-gray-300 p-4 rounded-lg'>
                        <div className='flex text-center text-sm text-gray-600'>
                            Promo code applied. Paying will allow you to access full features.
                        </div>
                    </div>
                ) : (
                    <div className='border border-gray-300 p-4 rounded-lg'>
                        <PromoCodeForm onSubmit={handlePromoSubmit} />
                    </div>
                )}

                <div className='text-center text-sm text-gray-500'>
                    <p>
                        Need help?{' '}
                        <a
                            href='#'
                            className='text-primary underline'
                            onClick={(e) => {
                                e.preventDefault();
                                router.push('/faqs');
                            }}
                        >
                            Read our FAQs
                        </a>
                    </p>
                </div>
            </div>
            <StepButtons
                asSubmit={false}
                onNext={paymentModalComplete || hasPromoCode ? onNext : undefined}
                onPrevious={onPrevious}
            />
        </>
    );
}
