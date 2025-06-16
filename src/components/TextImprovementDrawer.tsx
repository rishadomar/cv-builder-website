import { useState, useRef, useEffect } from 'react';
import { DrawerFooter } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, Loader2, CornerDownLeft, Clock} from 'lucide-react';
import { AIIcon } from './AIIcon';
import { Badge } from '@/components/ui/badge';
import { DrawerDialog } from './DrawerDialog';

const IMPROVEMENT_SUGGESTIONS = [
    'Make shorter',
    'Make longer with more details',
    'Make more informal',
    'Fix grammar and spelling',
    'More professional tone',
    'Simplify language'
];

type TextEntry = {
    text: string;
    prompt: string;
    timestamp: Date;
    isOriginal: boolean;
};

type TextImprovementDrawerProps = {
    originalText: string;
    onSubmit: (userInput: string, originalText: string) => Promise<string>;
    onSave: (text: string) => void;
    triggerButtonText?: string;
};

export function TextImprovementDrawer({
    originalText,
    onSubmit,
    onSave,
    triggerButtonText = 'Improve Text'
}: TextImprovementDrawerProps) {
    const [userInput, setUserInput] = useState('');
    const [historyEntries, setHistoryEntries] = useState<TextEntry[]>([]);
    const [currentText, setCurrentText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const latestEntryRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    // Initialize with original text
    useEffect(() => {
        if (historyEntries.length === 0) {
            setHistoryEntries([
                {
                    text: originalText,
                    prompt: 'Original text',
                    timestamp: new Date(),
                    isOriginal: true
                }
            ]);
            setCurrentText(originalText);
        }
    }, [originalText, historyEntries.length]);

    // Scroll to the latest entry when a new one is added
    useEffect(() => {
        if (latestEntryRef.current) {
            latestEntryRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [historyEntries.length]);

    const handleRequestImprovement = async () => {
        if (!userInput.trim()) return;

        setIsLoading(true);

        try {
            const newText = await onSubmit(userInput, currentText);

            // Add the new entry to history
            setHistoryEntries((prev) => [
                ...prev,
                {
                    text: newText,
                    prompt: userInput,
                    timestamp: new Date(),
                    isOriginal: false
                }
            ]);

            // Update current text to the new improved version
            setCurrentText(newText);

            // Clear input
            setUserInput('');
        } catch (error) {
            console.error('Error improving text:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAccept = (text: string) => {
        // Apply the selected text
        onSave(text);

        // Reset the component state
        reset();

        // Close the drawer properly using state
        setIsOpen(false);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setUserInput(suggestion);
    };

    const reset = () => {
        setHistoryEntries([
            {
                text: originalText,
                prompt: 'Original text',
                timestamp: new Date(),
                isOriginal: true
            }
        ]);
        setCurrentText(originalText);
        setUserInput('');
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <DrawerDialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            trigger={
                <Button variant='outline' className='w-full mt-3' size='sm'>
                    <AIIcon />
                    {triggerButtonText}
                </Button>
            }
            title='Improve Your Text'
            description='Help AI improve your text'
            closeText='Close'
            content={
                <div className='mx-auto w-full max-w-4xl'>
                    <div className='space-y-4 pb-4'>
                        {/* History entries */}
                        {historyEntries.map((entry, index) => (
                            <div
                                key={index}
                                className={`border rounded-lg p-4 ${
                                    index === historyEntries.length - 1 ? 'bg-muted/100' : 'bg-white'
                                }`}
                                ref={index === historyEntries.length - 1 ? latestEntryRef : null}
                            >
                                <div className='flex justify-between items-start mb-2'>
                                    <div className='flex items-center'>
                                        {entry.isOriginal ? (
                                            <Badge variant='outline' className='mr-2'>
                                                Original
                                            </Badge>
                                        ) : (
                                            <Badge variant='secondary' className='mr-2'>
                                                Improved
                                            </Badge>
                                        )}
                                        <span className='text-xs text-muted-foreground flex items-center'>
                                            <Clock className='w-3 h-3 mr-1' />
                                            {formatTime(entry.timestamp)}
                                        </span>
                                    </div>

                                    {!entry.isOriginal && (
                                        <Button onClick={() => handleAccept(entry.text)} variant='ghost' size='sm'>
                                            <ThumbsUp className='h-3 w-3 mr-1' />
                                            Accept
                                        </Button>
                                    )}
                                </div>

                                <div className='text-sm whitespace-pre-line'>{entry.text}</div>

                                {!entry.isOriginal && (
                                    <p className='text-xs text-muted-foreground mt-2 italic'>Prompt: {entry.prompt}</p>
                                )}
                            </div>
                        ))}

                        {/* New improvement input */}
                        <div className='border-t pt-4 mt-6'>
                            <h4 className='text-sm font-medium mb-2'>Improve further:</h4>
                            <Textarea
                                placeholder='Tell me how you want to improve the text...'
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                className='min-h-[80px]'
                            />

                            <div className='mt-3 pb-6'>
                                <p className='text-xs text-muted-foreground mb-2'>Quick suggestions:</p>
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
                    </div>

                    <DrawerFooter className='pt-2 border-t'>
                        <div className='flex gap-2 w-full'>
                            <Button
                                className='flex-1'
                                variant='default'
                                onClick={handleRequestImprovement}
                                disabled={!userInput.trim() || isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                                        Improving...
                                    </>
                                ) : (
                                    <>
                                        <CornerDownLeft className='h-4 w-4 mr-2' />
                                        Improve Text
                                    </>
                                )}
                            </Button>
                        </div>
                    </DrawerFooter>
                </div>
            }
        />
    );
}
