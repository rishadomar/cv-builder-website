import { Progress } from '@/components/ui/progress';

type ComponentProps = {
    value: number;
};

export function ProgressBar({ value }: ComponentProps) {
    return <Progress value={value} className='[&>*]:bg-green-300 w-[100%]' />;
}
