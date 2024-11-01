import { useAppSelector } from '@/lib/store/hooks';
import { PaymentPrompt } from '@/app/builder/PaymentPrompt';
import { PaymentComplete } from '@/app/builder/PaymentComplete';

type MilestoneCaptureDataProps = {
    onNext: () => void;
    onPrevious: () => void;
};

export function MilestoneCaptureData({ onNext, onPrevious }: MilestoneCaptureDataProps) {
    const fieldValues = useAppSelector((state) => state.fieldValues);

    console.log('Payment in fieldValues', fieldValues.payment);

    if (fieldValues.payment) {
        return <PaymentComplete paymentDetails={fieldValues.payment} onNext={onNext} onPrevious={onPrevious} />;
    } else {
        return <PaymentPrompt onNext={onNext} onPrevious={onPrevious} />;
    }
}
