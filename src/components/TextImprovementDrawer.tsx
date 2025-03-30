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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wand2, ThumbsUp, RotateCcw, Loader2 } from 'lucide-react';

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

type ImprovementHistoryItem = {
    type: 'original' | 'improvement';
    prompt: string;
    text: string;
};

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
    const [improvedText, setImprovedText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [activeView, setActiveView] = useState('input'); // "input" or "review"
    const [improvementHistory, setImprovementHistory] = useState<ImprovementHistoryItem[]>([
        { type: 'original', prompt: '', text: originalText }
    ]);

    const handleRequestImprovement = async () => {
        if (!userInput.trim()) return;

        setIsLoading(true);

        try {
            // In real implementation, call your API
            const newText = await onSubmit(userInput, improvementHistory[improvementHistory.length - 1].text, false);

            // Add to history
            setImprovementHistory([...improvementHistory, { type: 'improvement', prompt: userInput, text: newText }]);

            setImprovedText(newText);
            setUserInput('');
            setActiveView('review');
        } catch (error) {
            console.error('Error improving text:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAccept = () => {
        // Close drawer and submit final text
        onSubmit('', improvementHistory[improvementHistory.length - 1].text, true);
        // Reset state for next time
        setImprovedText('');
        setUserInput('');
        setActiveView('input');
        setImprovementHistory([{ type: 'original', prompt: '', text: originalText }]);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setUserInput(suggestion);
    };

    const handleNewRequest = () => {
        setActiveView('input');
    };

    const handleReset = () => {
        // Reset to original text
        setImprovementHistory([{ type: 'original', prompt: '', text: originalText }]);
        setActiveView('input');
        setUserInput('');
    };

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button className='gap-2'>
                    <Wand2 className='h-4 w-4' />
                    {triggerButtonText}
                </Button>
            </DrawerTrigger>

            <DrawerContent className='max-h-[90vh]'>
                <div className='mx-auto w-full max-w-4xl'>
                    <DrawerHeader>
                        <DrawerTitle>Improve Your Text</DrawerTitle>
                        <DrawerDescription>
                            I will help you improve your CV text until you're satisfied with it.
                        </DrawerDescription>
                    </DrawerHeader>

                    <ScrollArea className='p-4 max-h-[60vh]'>
                        {activeView === 'input' ? (
                            <div className='space-y-4'>
                                <div className='bg-muted p-4 rounded-lg text-sm'>
                                    <h4 className='font-medium mb-2'>Current Text:</h4>
                                    <p>{improvementHistory[improvementHistory.length - 1].text}</p>
                                </div>

                                <Textarea
                                    placeholder='Tell me how you want to improve the text...'
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    className='min-h-[100px]'
                                />

                                <div>
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
                            <div className='space-y-4'>
                                <Tabs defaultValue='improved'>
                                    <TabsList className='grid w-full grid-cols-2'>
                                        <TabsTrigger value='previous'>Previous Version</TabsTrigger>
                                        <TabsTrigger value='improved'>Improved Version</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value='previous' className='p-4 bg-muted rounded-lg mt-2'>
                                        <h4 className='font-medium mb-2'>Previous Text:</h4>
                                        <p>
                                            {improvementHistory.length > 1
                                                ? improvementHistory[improvementHistory.length - 2].text
                                                : originalText}
                                        </p>
                                    </TabsContent>
                                    <TabsContent value='improved' className='p-4 bg-muted/50 border rounded-lg mt-2'>
                                        <h4 className='font-medium mb-2'>Improved Text:</h4>
                                        <p>{improvementHistory[improvementHistory.length - 1].text}</p>
                                        <p className='text-xs text-muted-foreground mt-2'>
                                            Improvement:{' '}
                                            {improvementHistory.length > 1
                                                ? improvementHistory[improvementHistory.length - 1].prompt
                                                : 'Original'}
                                        </p>
                                    </TabsContent>
                                </Tabs>

                                <div className='pt-2'>
                                    <h4 className='font-medium mb-2'>Improvement History:</h4>
                                    <div className='space-y-2'>
                                        {improvementHistory.map((item, index) => (
                                            <div
                                                key={index}
                                                className={`p-2 text-xs rounded ${
                                                    index === improvementHistory.length - 1
                                                        ? 'bg-primary/10 border border-primary/30'
                                                        : 'bg-muted'
                                                }`}
                                            >
                                                <span className='font-medium'>
                                                    {index === 0 ? 'Original' : `Change ${index}: ${item.prompt}`}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </ScrollArea>

                    <DrawerFooter>
                        {activeView === 'input' ? (
                            <>
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
                                {improvementHistory.length > 1 && (
                                    <Button variant='outline' onClick={handleReset}>
                                        <RotateCcw className='h-4 w-4 mr-2' />
                                        Reset to Original
                                    </Button>
                                )}
                            </>
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
                                <DrawerClose asChild>
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
