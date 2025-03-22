'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CallToActionProps {
    label: string;
    bgColor: string;
    textColor: string;
    hoverColor: string;
    withArrow: boolean;
    to: string;
}

const CallToAction = ({ label, bgColor, textColor, hoverColor, withArrow, to }: CallToActionProps) => {
    const router = useRouter();

    const callToAction = () => {
        router.push(to);
    };

    return (
        <button
            className={`${bgColor} ${textColor} hover:${hoverColor} px-6 py-3 rounded-lg transition flex items-center`}
            onClick={() => callToAction()}
        >
            {label}
            {withArrow && <ArrowRight className='ml-2' />}
        </button>
    );
};
export default CallToAction;
