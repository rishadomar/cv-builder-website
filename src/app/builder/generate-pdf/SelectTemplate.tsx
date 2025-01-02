import React from 'react';
import { Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StepButtons } from '../StepButtons';
import { useAppDispatch } from '@/lib/store/hooks';
import { StepContainer } from '../StepContainer';
import { getStep } from '@/lib/utils/step';
import * as services from '@/lib/services';
import { toast } from '@/hooks/use-toast';
import { CustomError } from '@/lib/utils/customError';
import { AvailablePDFTemplates } from '@/lib/type';

const templates = [
    {
        id: 'default',
        name: 'Modern',
        description: 'Clean and contemporary design with a focus on readability',
        image: '/api/placeholder/200/282' // Using placeholder for example, replace with actual template preview
    },
    {
        id: 'professional',
        name: 'Professional',
        description: 'Traditional layout ideal for corporate positions',
        image: '/api/placeholder/200/282'
    },
    {
        id: 'creative',
        name: 'Creative',
        description: 'Unique design perfect for creative industries',
        image: '/api/placeholder/200/282'
    }
];

type SelectTemplateProps = {
    onNext: () => void;
    onPrevious: () => void;
};

export default function SelectTemplate({ onNext, onPrevious }: SelectTemplateProps) {
    const dispatch = useAppDispatch();
    const [selectedTemplate, setSelectedTemplate] = React.useState<AvailablePDFTemplates>();
    // const selectedTemplate = useAppSelector((state) => state.templateSelection.selected);
    const step = getStep('select-template');

    const handleTemplateSelect = (templateId: string) => {
        setSelectedTemplate(templateId as AvailablePDFTemplates);
    };

    const onSubmit = async (event?: React.BaseSyntheticEvent) => {
        event?.preventDefault();

        const submitter = (event?.nativeEvent as SubmitEvent).submitter;
        const submitterName =
            submitter instanceof HTMLButtonElement || submitter instanceof HTMLInputElement
                ? submitter.name
                : undefined;

        if (onNext && submitterName === 'next' && selectedTemplate) {
            try {
                await dispatch(services.generatePDF(selectedTemplate));
                onNext();
            } catch (error) {
                if (error instanceof CustomError) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: error.message
                    });
                } else {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: 'An unexpected error occurred. Please try again.'
                    });
                }
            } finally {
            }
        } else if (onPrevious && submitterName === 'previous') {
            onPrevious();
        }
    };

    return (
        <>
            <StepContainer step={step}>
                <div className='space-y-4'>
                    <h2 className='text-xl font-bold tracking-tight'>Choose Your CV Template</h2>
                    <p className='text-xs text-muted-foreground'>
                        Select a template that best represents your professional identity. You can return to this step
                        to select another template.
                    </p>
                </div>

                <div className='grid gap-6 md:grid-cols-3'>
                    {templates.map((template) => (
                        <Card
                            key={template.id}
                            className={`cursor-pointer transition-all ${
                                selectedTemplate === template.id ? 'ring-2 ring-primary' : ''
                            }`}
                            onClick={() => handleTemplateSelect(template.id)}
                        >
                            <CardHeader className='space-y-1'>
                                <CardTitle className='flex items-center justify-between'>
                                    {template.name}
                                    {selectedTemplate === template.id && <Check className='h-5 w-5 text-primary' />}
                                </CardTitle>
                                <CardDescription className='text-xs'>{template.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className='aspect-[1/1.414] relative rounded-md overflow-hidden border'>
                                    <img
                                        src={template.image}
                                        alt={`${template.name} template preview`}
                                        className='object-cover w-full h-full'
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    variant={selectedTemplate === template.id ? 'default' : 'outline'}
                                    className='w-full'
                                    onClick={() => handleTemplateSelect(template.id)}
                                >
                                    {selectedTemplate === template.id ? 'Selected' : 'Select Template'}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </StepContainer>

            <form onSubmit={onSubmit} className='flex flex-col'>
                <StepButtons onNext={selectedTemplate ? onNext : undefined} onPrevious={onPrevious} />
            </form>
        </>
    );
}
