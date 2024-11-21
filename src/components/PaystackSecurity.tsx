import PaystackImage from './PaystackImage';
import { ShieldCheckIcon } from 'lucide-react';

function PaystackSecurity() {
    return (
        <div className='bg-green-50 border border-green-200 p-4 rounded-lg flex items-center space-x-3'>
            <ShieldCheckIcon className='w-6 h-6 text-green-600' />
            <div>
                <p className='text-green-800 font-medium'>Secure Payment</p>
                <p className='text-green-700 text-sm'>
                    Payment secured and processed by
                    <span className='font-bold ml-1'>Paystack</span>
                </p>
                <PaystackImage />
            </div>
        </div>
    );
}

export default PaystackSecurity;
