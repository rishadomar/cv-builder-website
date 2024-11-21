'use client';
import Image from 'next/image';

const PaystackImage = () => {
    return (
        <div
            className='flex justify-center items-center space-x-2 mt-4'
            onClick={() => {
                window.open('https://paystack.com', '_blank');
            }}
        >
            <Image src='/images/paystack-logo.png' width='200' height='30' alt='Paystack Logo' className='h-8 w-auto' />
        </div>
    );
};

export default PaystackImage;
