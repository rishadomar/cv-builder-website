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
    console.log('-----   PaymentComplete: paymentDetails', paymentDetails);
    return (
        <Card className='w-[350px]'>
            <CardHeader>
                <CardTitle>Congratulations</CardTitle>
                <CardDescription>You&apos;re on your way</CardDescription>
            </CardHeader>
            <CardContent>
                <small>Thanks for your payment on: </small>
                <div>
                    <small>{paymentDetails.date ? formatDate(new Date(paymentDetails.date)) : 'unknown'}</small>
                </div>
                <div>
                    <small>Amount: {formatAmount(paymentDetails.currency, paymentDetails.amount)}</small>
                </div>
            </CardContent>
            <CardFooter>
                <StepButtons onNext={onNext} onPrevious={onPrevious} asSubmit={false} />
            </CardFooter>
        </Card>
    );
}
