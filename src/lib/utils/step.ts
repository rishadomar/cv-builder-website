import { Bird } from 'lucide-react';
import { StepPath, StepType } from '../type';
import { Steps } from '@/components/ProgressSteps';

const UnfoundStep = {
    id: 0,
    title: 'Not found',
    icon: Bird,
    description: 'Step not found',
    completed: false,
    path: 'not-found',
    showInSections: false,
    paymentRequired: false
};

export const getStep = (path: StepPath) => {
    const foundStep = Steps.find((step) => step.path === path);
    return foundStep ?? UnfoundStep;
};
