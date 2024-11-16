import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { useRouter } from 'next/navigation';

export type StepPath =
    | 'contact-details'
    | 'personal-details'
    | 'location-details'
    | 'remote-work-details'
    | 'personality-details'
    | 'hobbies'
    | 'work-experience'
    | 'milestone-capture-data'
    | 'review-personality-details'
    | 'generate-pdf';

export const Steps = [
    {
        id: 1,
        title: 'Contact',
        description: 'Provide contact details',
        completed: true,
        path: 'contact-details'
    },
    {
        id: 2,
        title: 'Personal',
        description: 'Enter details about yourself',
        completed: true,
        path: 'personal-details'
    },
    {
        id: 3,
        title: 'Your location',
        description: 'Provide your current location',
        completed: false,
        path: 'location-details'
    },
    {
        id: 4,
        title: 'Remote work preferences',
        description: 'Select remote work preferences',
        completed: false,
        path: 'remote-work-details'
    },
    {
        id: 5,
        title: 'Personality',
        description: 'Dive deeper into your personality',
        completed: false,
        path: 'personality-details'
    },
    {
        id: 6,
        title: 'Hobbies',
        description: 'What do you enjoy doing to accomplish a life/work balance',
        completed: false,
        path: 'hobbies'
    },
    {
        id: 7,
        title: 'Work experience',
        description: 'Professional experience',
        completed: false,
        path: 'work-experience'
    },
    {
        id: 8,
        title: 'Milestone capture',
        description: 'Pay please to continue',
        completed: false,
        path: 'milestone-capture-data'
    },
    {
        id: 9,
        title: 'Review personality',
        description: 'Let AI guide you to describe your personality',
        completed: false,
        path: 'review-personality-details'
    },
    {
        id: 10,
        title: 'Generate & download CV',
        description: 'A PDF will be generated which you can download for keeps',
        completed: false,
        path: 'generate-pdf'
    }
];

type ProgressStepsProps = {
    onClose: () => void;
};

const ProgressSteps: React.FC<ProgressStepsProps> = ({ onClose }: ProgressStepsProps) => {
    const router = useRouter();
    return (
        <Card className='w-full max-w-md'>
            {/* <CardHeader>
                <CardTitle>Build your CV</CardTitle>
                <CardDescription>Complete these steps to complete your CV</CardDescription>
            </CardHeader> */}
            <CardContent className='mt-3'>
                <ol className='space-y-4'>
                    {Steps.map((step, index) => (
                        <li
                            key={step.id}
                            className='flex items-center space-x-4'
                            onClick={() => {
                                onClose();
                                router.replace(`/builder?page=${step.path}`);
                            }}
                        >
                            <div
                                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                    step.id < 5 ? 'bg-green-500' : 'bg-gray-200'
                                }`}
                                aria-hidden='true'
                            >
                                {step.id < 5 ? (
                                    <Icons.check className='h-5 w-5 text-white' />
                                ) : (
                                    <span className='text-gray-600'>{step.id}</span>
                                )}
                            </div>
                            <div className='flex-1'>
                                <h3 className='text-sm font-semibold'>{step.title}</h3>
                                {/* <p className='text-sm text-gray-500'>{step.description}</p> */}
                            </div>
                            {index < Steps.length - 1 && (
                                <Icons.chevronRight className='h-5 w-5 text-gray-400' aria-hidden='true' />
                            )}
                        </li>
                    ))}
                </ol>
            </CardContent>
        </Card>
    );
};

export default ProgressSteps;
