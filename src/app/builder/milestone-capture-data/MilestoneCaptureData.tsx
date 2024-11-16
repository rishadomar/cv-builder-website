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

export default function MilestoneCaptureData({ onNext, onPrevious }: MilestoneCaptureDataProps) {
    const fieldValues = useAppSelector((state) => state.fieldValues);
    return (
        <div className='h-[calc(100vh-theme(spacing.16)-theme(spacing.20))] overflow-y-auto'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6'>
                {fieldValues.payment ? (
                    <PaymentComplete paymentDetails={fieldValues.payment} onNext={onNext} onPrevious={onPrevious} />
                ) : (
                    <PaymentPrompt onNext={onNext} onPrevious={onPrevious} />
                )}
            </div>
        </div>
    );
}
