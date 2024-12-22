import { Card, CardTitle, CardFooter, CardHeader, CardDescription, CardContent } from '@/components/ui/card';
import { StepButtons } from './StepButtons';
import { formatAmount, formatDate } from '@/lib/utils';
import { PaymentDetails } from '@/lib/type';

type PaymentCompleteProps = {
    paymentDetails: PaymentDetails;
    onNext: () => void;
    onPrevious: () => void;
};

export function PaymentComplete({ paymentDetails, onNext, onPrevious }: PaymentCompleteProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Thank you for your payment</CardTitle>
            </CardHeader>
            <CardContent>
                <small>Your payment was made on: </small>
                <div>
                    <small>{paymentDetails.date ? formatDate(new Date(paymentDetails.date)) : 'unknown'}</small>
                </div>
                <div>
                    <small>Amount: {formatAmount(paymentDetails.currency, paymentDetails.amount, true)}</small>
                </div>
            </CardContent>
            <CardFooter>
                <StepButtons onNext={onNext} onPrevious={onPrevious} asSubmit={false} />
            </CardFooter>
        </Card>
    );
}
