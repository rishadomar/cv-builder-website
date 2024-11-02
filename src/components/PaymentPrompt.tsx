import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { Card, CardTitle, CardFooter, CardHeader, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PaystackButton from '@/components/PaystackButton';
import { paymentComplete } from '@/lib/services/paymentService';

const Amount = 5900;

type PaymentPromptProps = {
    onNext: () => void;
    onPrevious: () => void;
};

export function PaymentPrompt({ onNext, onPrevious }: PaymentPromptProps) {
    const dispatch = useAppDispatch();
    const authentication = useAppSelector((state) => state.authentication);
    const onSuccess = async (response: any) => {
        console.log('Paystack payment modal response', response);
        await dispatch(paymentComplete(Amount, response.reference));
    };

    return (
        <Card className='w-[350px]'>
            <CardHeader>
                <CardTitle>Congratulations</CardTitle>
                <CardDescription>You&apos;re on your way</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Pay before continuing</p>
            </CardContent>

            <CardFooter>
                <div className='flex space-x-4'>
                    <Button variant='outline' onClick={() => onPrevious()}>
                        Back
                    </Button>
                    <PaystackButton
                        label='Pay now'
                        options={{
                            email: authentication.email!,
                            amount: Amount,
                            reference: `payment_${new Date().getTime().toString()}`
                        }}
                        onSuccess={async (response) => {
                            console.log(response);
                            await onSuccess(response);
                            onNext();
                        }}
                        onClose={() => {
                            console.log('closed');
                        }}
                    />
                </div>
            </CardFooter>
        </Card>
    );
}
