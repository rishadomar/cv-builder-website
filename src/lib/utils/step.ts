import {
    Bike,
    Briefcase,
    CreditCard,
    Download,
    Globe,
    GraduationCap,
    Heart,
    Link,
    Mail,
    MapPinHouse,
    User
} from 'lucide-react';
import { StepPath, StepType } from '../type';

export const Steps: StepType[] = [
    {
        id: 1,
        title: 'Contact',
        icon: Mail,
        description: 'Provide contact details',
        completed: true,
        path: 'contact-details',
        showInSections: true,
        paymentRequired: false
    },
    {
        id: 2,
        title: 'Personal',
        icon: User,
        description: 'Enter details about yourself',
        completed: true,
        path: 'personal-details',
        showInSections: true,
        paymentRequired: false
    },
    {
        id: 3,
        title: 'Your location',
        icon: MapPinHouse,
        description: 'Provide your current location',
        completed: false,
        path: 'location-details',
        showInSections: true,
        paymentRequired: false
    },
    {
        id: 4,
        title: 'Remote work preferences',
        icon: Globe,
        description: 'Select remote work preferences',
        completed: false,
        path: 'remote-work-details',
        showInSections: true,
        paymentRequired: false
    },
    {
        id: 5,
        title: 'Personality',
        icon: Heart,
        description: 'Dive deeper into your personality',
        completed: false,
        path: 'personality-details',
        showInSections: true,
        paymentRequired: false
    },
    {
        id: 6,
        title: 'Social Links',
        icon: Link,
        description: 'Links to your social media profiles',
        completed: false,
        path: 'social-links',
        showInSections: true,
        paymentRequired: false
    },
    {
        id: 7,
        title: 'Paywall capture',
        icon: CreditCard,
        description: 'Pay please to continue',
        completed: false,
        path: 'paywall',
        showInSections: false,
        paymentRequired: false
    },
    {
        id: 8,
        title: 'Hobbies',
        icon: Bike,
        description: 'What do you enjoy doing to accomplish a life/work balance',
        completed: false,
        path: 'hobbies',
        showInSections: true,
        paymentRequired: true
    },
    {
        id: 9,
        title: 'Education',
        icon: GraduationCap,
        description: 'Educational background',
        completed: false,
        path: 'education',
        showInSections: true,
        paymentRequired: true
    },
    {
        id: 10,
        title: 'Work experience',
        icon: Briefcase,
        description: 'Professional experience',
        completed: false,
        path: 'work-experience',
        showInSections: true,
        paymentRequired: true
    },
    {
        id: 11,
        title: 'Review',
        description: 'Review your CV',
        completed: false,
        path: 'review',
        showInSections: false,
        paymentRequired: true
    },
    {
        id: 12,
        title: 'Generate & download CV',
        icon: Download,
        description: 'A PDF will be generated which you can download for keeps',
        completed: false,
        path: 'generate-pdf',
        showInSections: false,
        paymentRequired: true
    }
];

const UnfoundStep = {
    id: 0,
    title: 'Not found',
    description: 'Step not found',
    completed: false,
    path: 'not-found' as StepPath,
    showInSections: false,
    paymentRequired: false
};

export const getStep = (path: StepPath): StepType => {
    const foundStep = Steps.find((step) => step.path === path);
    return foundStep ?? UnfoundStep;
};
