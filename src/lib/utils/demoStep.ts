import { Briefcase, Download, Heart, Mail, Trophy } from 'lucide-react';
import { StepPath, StepType } from '../type';

export const DemoSteps: StepType[] = [
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
        title: 'Personality',
        icon: Heart,
        description: 'Dive deeper into your personality',
        completed: false,
        path: 'personality-details',
        showInSections: true,
        paymentRequired: false
    },
    {
        id: 3,
        title: 'Top Skills',
        icon: Trophy,
        description: 'Top skills acquired during your work experience',
        completed: false,
        path: 'top-skills',
        showInSections: true,
        paymentRequired: true
    },
    {
        id: 4,
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
    const foundStep = DemoSteps.find((step) => step.path === path);
    return foundStep ?? UnfoundStep;
};
