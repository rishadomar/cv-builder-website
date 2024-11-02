import { useAppSelector } from '@/lib/store/hooks';
import { PaymentComplete } from '@/app/builder/PaymentComplete';
import dynamic from 'next/dynamic';

const PaymentPrompt = dynamic(() => import('@/components/PaymentPrompt').then((mod) => mod.PaymentPrompt), {
    ssr: false,
    loading: () => <div>Loading...</div>
});

type MilestoneCaptureDataProps = {
    onNext: () => void;
    onPrevious: () => void;
};

export function MilestoneCaptureData({ onNext, onPrevious }: MilestoneCaptureDataProps) {
    const fieldValues = useAppSelector((state) => state.fieldValues);

    if (fieldValues.payment) {
        return <PaymentComplete paymentDetails={fieldValues.payment} onNext={onNext} onPrevious={onPrevious} />;
    }
    return <PaymentPrompt onNext={onNext} onPrevious={onPrevious} />;
}
