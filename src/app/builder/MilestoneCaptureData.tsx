import { useAppSelector } from '@/lib/store/hooks';
import { PaymentComplete } from '@/app/builder/PaymentComplete';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const PaymentPrompt = dynamic(() => import('@/components/PaymentPrompt').then((mod) => mod.PaymentPrompt), {
    ssr: false
});

type MilestoneCaptureDataProps = {
    onNext: () => void;
    onPrevious: () => void;
};

export function MilestoneCaptureData({ onNext, onPrevious }: MilestoneCaptureDataProps) {
    const [isClient, setIsClient] = useState(false);
    const fieldValues = useAppSelector((state) => state.fieldValues);

    useEffect(() => {
        setIsClient(true);
    }, []);

    console.log('Payment in fieldValues', fieldValues.payment);

    if (fieldValues.payment) {
        return <PaymentComplete paymentDetails={fieldValues.payment} onNext={onNext} onPrevious={onPrevious} />;
    } else if (!isClient) {
        return null;
    } else {
        return <PaymentPrompt onNext={onNext} onPrevious={onPrevious} />;
    }
}
