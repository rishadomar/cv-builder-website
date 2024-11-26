import { useAppSelector } from '@/lib/store/hooks';
import { PaymentComplete } from '@/app/builder/PaymentComplete';
import dynamic from 'next/dynamic';
import { selectIsPaymentValid } from '@/lib/store/fieldValues/fieldValuesSlice';

const PaymentPrompt = dynamic(() => import('@/components/PaymentPrompt').then((mod) => mod.PaymentPrompt), {
    ssr: false,
    loading: () => <div>Loading...</div>
});

type PaywallProps = {
    onNext: () => void;
    onPrevious: () => void;
};

export default function Paywall({ onNext, onPrevious }: PaywallProps) {
    const fieldValues = useAppSelector((state) => state.fieldValues);
    const isPaymentComplete = useAppSelector(selectIsPaymentValid);

    return (
        <div className='h-[calc(100vh-theme(spacing.16)-theme(spacing.20))] overflow-y-auto'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6'>
                {isPaymentComplete ? (
                    <PaymentComplete paymentDetails={fieldValues.payment!} onNext={onNext} onPrevious={onPrevious} />
                ) : (
                    <PaymentPrompt onNext={onNext} onPrevious={onPrevious} />
                )}
            </div>
        </div>
    );
}
