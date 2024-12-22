'use client';
import React from 'react';
import { useAppSelector } from '@/lib/store/hooks';
import PaymentInformation from './PaymentDetails';
import { useRouter } from 'next/navigation';
import Paywall from '@/app/builder/paywall/Paywall';
import { BackButton } from '@/components/BackButton';
import { selectHasPromoCode, selectIsPaymentValid } from '@/lib/store/fieldValues/fieldValuesSlice';

const BillingPage = () => {
    const isPaymentValid = useAppSelector(selectIsPaymentValid);
    const hasPromoCode = useAppSelector(selectHasPromoCode);
    const router = useRouter();

    return (
        <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4'>
            {isPaymentValid && !hasPromoCode ? (
                <PaymentInformation />
            ) : (
                <Paywall
                    onNext={() => {
                        router.replace('/billing');
                    }}
                    onPrevious={() => {
                        router.back();
                    }}
                />
            )}
            <BackButton />
        </div>
    );
};

export default BillingPage;
