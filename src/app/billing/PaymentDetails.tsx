import { WalletIcon, CalendarIcon } from 'lucide-react';
import { formatAmount, formatDate } from '@/lib/utils';
import { useAppSelector } from '@/lib/store/hooks';
import { selectHasPromoCode, selectIsPaymentValid } from '@/lib/store/fieldValues/fieldValuesSlice';

function PaymentInformation() {
    const fieldValues = useAppSelector((state) => state.fieldValues);
    const isPaymentValid = useAppSelector(selectIsPaymentValid);
    const hasPromoCode = useAppSelector(selectHasPromoCode);

    if (!isPaymentValid || hasPromoCode || !fieldValues.payment) {
        return;
    }

    return (
        <div className='w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-6'>
            <div className='text-center'>
                <h1 className='text-2xl font-bold text-gray-800 mb-2'>Billing Information</h1>
                <p className='text-gray-600'>Your CV Management Access</p>
            </div>

            <div className='space-y-4'>
                <div className='flex items-center justify-between bg-gray-100 p-4 rounded-lg'>
                    <div className='flex items-center space-x-3'>
                        <WalletIcon className='w-6 h-6 text-primary' />
                        <span className='font-medium text-gray-700'>Payment Amount</span>
                    </div>
                    <span className='font-bold text-gray-900'>
                        {formatAmount(fieldValues.payment.currency, fieldValues.payment.amount, true)}
                    </span>
                </div>

                <div className='flex items-center justify-between bg-gray-100 p-4 rounded-lg'>
                    <div className='flex items-center space-x-3'>
                        <CalendarIcon className='w-6 h-6 text-primary' />
                        <span className='font-medium text-gray-700'>Payment Date</span>
                    </div>
                    <span className='font-bold text-gray-900'>{formatDate(new Date(fieldValues.payment.date))}</span>
                </div>
            </div>

            <div className='text-center text-sm text-gray-500 mt-4'>
                <p>Access valid for 1 year from payment date</p>
                <p className='mt-2'>
                    <a href='/faqs' className='text-primary underline'>
                        Need help?
                    </a>
                </p>
            </div>
        </div>
    );
}

export default PaymentInformation;
