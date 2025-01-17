'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CallToActionProps {
    label: string;
    color: 'gray' | 'white';
    withArrow: boolean;
}

const CallToAction = ({ label, color, withArrow }: CallToActionProps) => {
    const router = useRouter();

    const callToAction = () => {
        router.push('/authentication');
    };

    return (
        <button
            className={`${
                color === 'white'
                    ? 'bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition flex items-center'
                    : 'bg-white text-gray-900 px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-gray-100 transition'
            }`}
            onClick={() => callToAction()}
        >
            {label}
            {withArrow && <ArrowRight className='ml-2' />}
        </button>
    );
};
export default CallToAction;
