// components/TextImprovementDrawer.jsx
import { useState } from 'react';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, ThumbsUp, Loader2 } from 'lucide-react';
import { AIIcon } from './AIIcon';

const IMPROVEMENT_SUGGESTIONS = [
    'Make shorter',
    'Make longer with more details',
    'Make less formal',
    'Make more formal',
    'Fix grammar and spelling',
    'Add more achievements',
    'More professional tone',
    'Add measurable results',
    'Simplify language'
];

type TextImprovementDrawerProps = {
    originalText: string;
    onSubmit: (userInput: string, originalText: string, isFinal?: boolean) => Promise<string>;
    triggerButtonText?: string;
};

export function TextImprovementDrawer({
    originalText,
    onSubmit,
    triggerButtonText = 'Improve Text'
}: TextImprovementDrawerProps) {
    const [userInput, setUserInput] = useState('');
    const [currentText, setCurrentText] = useState(originalText);
    const [improvedText, setImprovedText] = useState('');
    const [lastPrompt, setLastPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showingImproved, setShowingImproved] = useState(false);

    const handleRequestImprovement = async () => {
        if (!userInput.trim()) return;

        setIsLoading(true);
        setLastPrompt(userInput);

        try {
            const newText = await onSubmit(userInput, currentText, false);
            setImprovedText(newText);
            setShowingImproved(true);
        } catch (error) {
            console.error('Error improving text:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAccept = () => {
        // Apply the improved text
        onSubmit('', improvedText, true);

        // Reset the component state
        reset();

        // Close the drawer
        document.querySelector<HTMLButtonElement>('.drawer-close-button')?.click();
    };

    const handleSuggestionClick = (suggestion: string) => {
        setUserInput(suggestion);
    };

    const handleNewRequest = () => {
        // Update current text to the improved version
        setCurrentText(improvedText);
        setImprovedText('');
        setUserInput('');
        setShowingImproved(false);
    };

    const reset = () => {
        setCurrentText(originalText);
        setImprovedText('');
        setUserInput('');
        setLastPrompt('');
        setShowingImproved(false);
    };

    return (
        <Drawer onClose={reset}>
            <DrawerTrigger asChild>
                <Button variant='outline' className='w-full mt-3' size='sm'>
                    <AIIcon />
                    {triggerButtonText}
                </Button>
            </DrawerTrigger>

            <DrawerContent className='max-h-[90vh]'>
                <div className='mx-auto w-full max-w-4xl'>
                    <DrawerHeader className='pb-2'>
                        <DrawerTitle>Improve Your Text</DrawerTitle>
                        <DrawerDescription>I will help you improve your CV text.</DrawerDescription>
                    </DrawerHeader>

                    {/* Use a div with overflow-y-auto here instead of the ScrollArea component */}
                    <div className='overflow-y-auto px-4 py-2' style={{ maxHeight: 'calc(90vh - 180px)' }}>
                        {!showingImproved ? (
                            <div className='space-y-4 pb-4'>
                                <div className='bg-muted p-4 rounded-lg text-sm'>
                                    <h4 className='font-medium mb-2'>Current Text:</h4>
                                    <p>{currentText}</p>
                                </div>

                                <Textarea
                                    placeholder='Tell me how you want to improve the text...'
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    className='min-h-[100px]'
                                />

                                <div className='pb-6'>
                                    {' '}
                                    {/* Added padding to ensure visibility */}
                                    <p className='text-sm text-muted-foreground mb-2'>Quick suggestions:</p>
                                    <div className='flex flex-wrap gap-2'>
                                        {IMPROVEMENT_SUGGESTIONS.map((suggestion) => (
                                            <Button
                                                key={suggestion}
                                                variant='outline'
                                                size='sm'
                                                onClick={() => handleSuggestionClick(suggestion)}
                                                className='rounded-full'
                                            >
                                                {suggestion}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='space-y-4 pb-4'>
                                <div className='bg-muted/50 border p-4 rounded-lg'>
                                    <h4 className='font-medium mb-2'>Improved Text:</h4>
                                    <p>{improvedText}</p>
                                    <p className='text-xs text-muted-foreground mt-2'>Improvement: {lastPrompt}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <DrawerFooter className='pt-2 border-t'>
                        {!showingImproved ? (
                            <Button onClick={handleRequestImprovement} disabled={!userInput.trim() || isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                                        Improving...
                                    </>
                                ) : (
                                    'Improve Text'
                                )}
                            </Button>
                        ) : (
                            <div className='flex flex-col gap-2 w-full'>
                                <div className='grid grid-cols-2 gap-2'>
                                    <Button onClick={handleNewRequest} variant='outline'>
                                        Improve Further
                                    </Button>
                                    <Button onClick={handleAccept}>
                                        <ThumbsUp className='h-4 w-4 mr-2' />
                                        Accept & Apply
                                    </Button>
                                </div>
                                <DrawerClose asChild className='drawer-close-button' onClick={reset}>
                                    <Button variant='ghost'>Close Without Changes</Button>
                                </DrawerClose>
                            </div>
                        )}
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
