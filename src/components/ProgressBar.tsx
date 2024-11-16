import { Progress } from '@/components/ui/progress';

type ComponentProps = {
    value: number;
};

export function ProgressBar({ value }: ComponentProps) {
    return <Progress value={value} className='w-[100%]' />;
}
