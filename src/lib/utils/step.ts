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
    TextSelect,
    Trophy
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
        title: 'Your location',
        icon: MapPinHouse,
        description: 'Provide your current location',
        completed: false,
        path: 'location-details',
        showInSections: true,
        paymentRequired: false
    },
    {
        id: 3,
        title: 'Remote work preferences',
        icon: Globe,
        description: 'Select remote work preferences',
        completed: false,
        path: 'remote-work-details',
        showInSections: true,
        paymentRequired: false
    },
    {
        id: 4,
        title: 'Personality',
        icon: Heart,
        description: 'Dive deeper into your personality',
        completed: false,
        path: 'personality-details',
        showInSections: true,
        paymentRequired: false
    },
    {
        id: 5,
        title: 'Social Links',
        icon: Link,
        description: 'Links to your social media profiles',
        completed: false,
        path: 'social-links',
        showInSections: true,
        paymentRequired: false
    },
    {
        id: 6,
        title: 'Paywall capture',
        icon: CreditCard,
        description: 'Pay please to continue',
        completed: false,
        path: 'paywall',
        showInSections: false,
        paymentRequired: false
    },
    {
        id: 7,
        title: 'Hobbies',
        icon: Bike,
        description: 'What do you enjoy doing to accomplish a life/work balance',
        completed: false,
        path: 'hobbies',
        showInSections: true,
        paymentRequired: true
    },
    {
        id: 8,
        title: 'Education',
        icon: GraduationCap,
        description: 'Educational background',
        completed: false,
        path: 'education',
        showInSections: true,
        paymentRequired: true
    },
    {
        id: 9,
        title: 'Work experience',
        icon: Briefcase,
        description: 'Professional experience',
        completed: false,
        path: 'work-experience',
        showInSections: true,
        paymentRequired: true
    },
    {
        id: 10,
        title: 'Top Skills',
        icon: Trophy,
        description: 'Top skills acquired during your work experience',
        completed: false,
        path: 'top-skills',
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
        title: 'Select template',
        icon: TextSelect,
        description: 'Select a template for your CV',
        completed: false,
        path: 'select-template',
        showInSections: false,
        paymentRequired: true
    },
    {
        id: 13,
        title: 'Download PDF',
        icon: Download,
        description: 'Download your PDF for keeps',
        completed: false,
        path: 'download-pdf',
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
