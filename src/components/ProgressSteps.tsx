import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ContactDetailsForm } from '@/app/builder/ContactDetailsForm';
import { PersonalDetailsForm } from '@/app/builder/PersonalDetailsForm';
import { LocationDetailsForm } from '@/app/builder/LocationDetailsForm';
import { RemoteWorkDetailsForm } from '@/app/builder/RemoteWorkDetailsForm';
import { HobbyDetailsForm } from '@/app/builder/HobbiesDetailsForm';
import WorkExperienceList from '@/app/builder/workExperience/WorkExperienceList';
import { PersonalityDetailsForm } from '@/app/builder/PersonalityDetailsForm';
import { MilestoneCaptureData } from '@/app/builder/MilestoneCaptureData';
import { ReviewPersonalityDetailsForm } from '@/app/builder/ReviewPersonalityDetailsForm';
import { GeneratePDF } from '@/app/builder/GeneratePDF';
import { Icons } from '@/components/icons';
import { useRouter } from 'next/navigation';

const steps = [
    {
        id: 1,
        title: 'Contact details',
        description: 'Provide contact details',
        completed: true,
        component: ContactDetailsForm
    },
    {
        id: 2,
        title: 'Personal details',
        description: 'Enter details about yourself',
        completed: true,
        component: PersonalDetailsForm
    },
    {
        id: 3,
        title: 'Your location',
        description: 'Provide your current location',
        completed: false,
        component: LocationDetailsForm
    },
    {
        id: 4,
        title: 'Remote work preferences',
        description: 'Select remote work preferences',
        completed: false,
        component: RemoteWorkDetailsForm
    },
    {
        id: 5,
        title: 'Personality details',
        description: 'Dive deeper into your personality',
        completed: false,
        component: PersonalityDetailsForm
    },
    {
        id: 6,
        title: 'Hobbies',
        description: 'What do you enjoy doing to accomplish a life/work balance',
        completed: false,
        component: HobbyDetailsForm
    },
    {
        id: 7,
        title: 'Work experience',
        description: 'Professional experience',
        completed: false,
        component: WorkExperienceList
    },
    {
        id: 8,
        title: 'Milestone capture',
        description: 'Pay please to continue',
        completed: false,
        component: MilestoneCaptureData
    },
    {
        id: 9,
        title: 'Review personality details',
        description: 'Let AI guide you to describe your personality',
        completed: false,
        component: ReviewPersonalityDetailsForm
    },
    {
        id: 10,
        title: 'Generate & download your CV',
        description: 'A PDF will be generated which you can download for keeps',
        completed: false,
        component: GeneratePDF
    }
];

const ProgressSteps: React.FC = () => {
    const router = useRouter();
    return (
        <Card className='w-full max-w-md'>
            <CardHeader>
                <CardTitle>Build your CV</CardTitle>
                <CardDescription>Complete these steps to complete your CV</CardDescription>
            </CardHeader>
            <CardContent>
                <ol className='space-y-4'>
                    {steps.map((step, index) => (
                        <li
                            key={step.id}
                            className='flex items-center space-x-4'
                            onClick={() => {
                                router.push('/builder');
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
                                <h3 className='text-lg font-semibold'>{step.title}</h3>
                                <p className='text-sm text-gray-500'>{step.description}</p>
                            </div>
                            {index < steps.length - 1 && (
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
