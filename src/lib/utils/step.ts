import { StepPath, Steps } from '@/components/ProgressSteps';

export const getStep = (path: StepPath) => {
    return Steps.find((step) => step.path === path);
};
