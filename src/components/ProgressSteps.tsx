import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { Check, CircleChevronRight } from 'lucide-react';

export type StepPath =
    | 'contact-details'
    | 'personal-details'
    | 'location-details'
    | 'remote-work-details'
    | 'personality-details'
    | 'hobbies'
    | 'work-experience'
    | 'paywall'
    | 'review-personality-details'
    | 'generate-pdf';

export const Steps = [
    {
        id: 1,
        title: 'Contact',
        description: 'Provide contact details',
        completed: true,
        path: 'contact-details',
        showInSections: true
    },
    {
        id: 2,
        title: 'Personal',
        description: 'Enter details about yourself',
        completed: true,
        path: 'personal-details',
        showInSections: true
    },
    {
        id: 3,
        title: 'Your location',
        description: 'Provide your current location',
        completed: false,
        path: 'location-details',
        showInSections: true
    },
    {
        id: 4,
        title: 'Remote work preferences',
        description: 'Select remote work preferences',
        completed: false,
        path: 'remote-work-details',
        showInSections: true
    },
    {
        id: 5,
        title: 'Personality',
        description: 'Dive deeper into your personality',
        completed: false,
        path: 'personality-details',
        showInSections: true
    },
    {
        id: 6,
        title: 'Hobbies',
        description: 'What do you enjoy doing to accomplish a life/work balance',
        completed: false,
        path: 'hobbies',
        showInSections: true
    },
    {
        id: 7,
        title: 'Work experience',
        description: 'Professional experience',
        completed: false,
        path: 'work-experience',
        showInSections: true
    },
    {
        id: 8,
        title: 'Paywall capture',
        description: 'Pay please to continue',
        completed: false,
        path: 'paywall',
        showInSections: false
    },
    {
        id: 9,
        title: 'Review personality',
        description: 'Let AI guide you to describe your personality',
        completed: false,
        path: 'review-personality-details',
        showInSections: true
    },
    {
        id: 10,
        title: 'Generate & download CV',
        description: 'A PDF will be generated which you can download for keeps',
        completed: false,
        path: 'generate-pdf',
        showInSections: false
    }
];

type ProgressStepsProps = {
    onSelect: () => void;
};

const ProgressSteps: React.FC<ProgressStepsProps> = ({ onSelect }) => {
    const router = useRouter();
    return (
        <Card className='w-full max-w-md'>
            <CardHeader className='hidden sm:block'>
                <CardTitle>Build your CV</CardTitle>
                <CardDescription>Complete these steps to complete your CV</CardDescription>
            </CardHeader>
            <CardContent className='mt-3'>
                <ol className='space-y-4'>
                    {Steps.filter((step) => step.showInSections).map((step, index) => (
                        <li
                            key={step.id}
                            className='flex items-center space-x-4'
                            onClick={() => {
                                onSelect();
                                router.replace(`/builder?page=${step.path}`);
                            }}
                        >
                            <div
                                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                    step.id < 5 ? 'bg-green-300' : 'bg-gray-200'
                                }`}
                                aria-hidden='true'
                            >
                                {step.id < 5 ? (
                                    <Check className='h-5 w-5 text-white' />
                                ) : (
                                    <span className='text-gray-600'>{index}</span>
                                )}
                            </div>
                            <div className='flex-1'>
                                <h3 className='text-sm font-semibold'>{step.title}</h3>
                                {/* <p className='text-sm text-gray-500'>{step.description}</p> */}
                            </div>
                            {index < Steps.length - 1 && (
                                <CircleChevronRight className='h-5 w-5 text-gray-400' aria-hidden='true' />
                            )}
                        </li>
                    ))}
                </ol>
            </CardContent>
        </Card>
    );
};

export default ProgressSteps;
