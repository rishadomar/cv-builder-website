'use client';
import React from 'react';
import { useAppSelector } from '@/lib/store/hooks';
import PaymentInformation from './PaymentDetails';
import { useRouter } from 'next/navigation';
import Paywall from '@/app/builder/paywall/Paywall';
import { BackButton } from '@/components/BackButton';

const BillingPage = () => {
    const fieldValues = useAppSelector((state) => state.fieldValues);
    const router = useRouter();

    return (
        <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4'>
            {fieldValues.payment ? (
                <PaymentInformation paymentValues={fieldValues.payment} />
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
