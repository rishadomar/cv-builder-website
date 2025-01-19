import { usePaystackPayment } from 'react-paystack';
import { Currency, PaystackProps } from 'react-paystack/dist/types';
import { Button } from '@/components/ui/button';

export const PaystackConfig = {
    currency: 'ZAR',
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
} as PaystackProps;

interface PaystackButtonProps {
    label: string;
    cancelLabel?: string;
    options: {
        email: string;
        currency: Currency;
        amount: number;
        reference: string;
        channels?: string[];
        metadata?: Record<string, unknown>;
    };
    onClose: () => void;
    onClick?: () => void;
    onSuccess: (response: unknown) => void;
}

/**
 * Expected options:
 *  email
 *  amount
 *  reference eg: `payment_${new Date().getTime().toString()}`
 */
export default function PaystackButton({ label, cancelLabel, options, onSuccess, onClose }: PaystackButtonProps) {
    const initializePayment = usePaystackPayment({
        ...PaystackConfig,
        ...options
    } as PaystackProps);

    return (
        <div className='flex flex-col gap-2 w-full'>
            <Button
                className='w-full'
                onClick={() => {
                    localStorage.setItem('payment-initiated', 'true');
                    initializePayment({ onSuccess, onClose });
                }}
            >
                {label}
            </Button>

            {cancelLabel && (
                <Button
                    variant='ghost'
                    size='sm'
                    className='w-full text-white hover:text-white hover:bg-white/[.10] border-none'
                    onClick={onClose}
                >
                    {cancelLabel}
                </Button>
            )}
        </div>
    );
}
