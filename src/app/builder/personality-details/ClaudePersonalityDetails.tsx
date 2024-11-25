import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, RefreshCw, Check, X, Wand2 } from 'lucide-react';

const PersonalityTraitsStep = () => {
    const [selectedTraits, setSelectedTraits] = useState([]);
    const [customTrait, setCustomTrait] = useState('');
    const [generatedText, setGeneratedText] = useState('');
    const [previousText, setPreviousText] = useState('');
    const [editedText, setEditedText] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [showComparison, setShowComparison] = useState(false);

    const predefinedTraits = [
        'Positive',
        'Confident',
        'Team Player',
        'Creative',
        'Organized',
        'Detail-oriented',
        'Problem Solver',
        'Leader',
        'Innovative',
        'Adaptable',
        'Self-motivated',
        'Communication'
    ];

    const handleTraitToggle = (trait) => {
        setSelectedTraits((prev) => (prev.includes(trait) ? prev.filter((t) => t !== trait) : [...prev, trait]));
    };

    const handleAddCustomTrait = () => {
        if (customTrait.trim()) {
            setSelectedTraits((prev) => [...prev, customTrait.trim()]);
            setCustomTrait('');
        }
    };

    const handleGenerate = () => {
        // Simulate AI generation
        setPreviousText(generatedText);
        setGeneratedText('Generated professional summary based on traits: ' + selectedTraits.join(', '));
        setEditedText('Generated professional summary based on traits: ' + selectedTraits.join(', '));
        setShowComparison(!!previousText);
    };

    const handleAcceptNew = () => {
        setShowComparison(false);
        setPreviousText('');
    };

    const handleRejectNew = () => {
        setGeneratedText(previousText);
        setEditedText(previousText);
        setShowComparison(false);
        setPreviousText('');
    };

    return (
        <div className='max-w-md mx-auto p-4 space-y-6'>
            {/* Traits Selection Section */}
            <div className='space-y-4'>
                <div className='flex flex-wrap gap-2'>
                    {predefinedTraits.map((trait) => (
                        <Badge
                            key={trait}
                            variant={selectedTraits.includes(trait) ? 'default' : 'outline'}
                            className='cursor-pointer'
                            onClick={() => handleTraitToggle(trait)}
                        >
                            {trait}
                        </Badge>
                    ))}
                </div>

                <div className='flex gap-2'>
                    <Input
                        placeholder='Add custom trait'
                        value={customTrait}
                        onChange={(e) => setCustomTrait(e.target.value)}
                        className='flex-1'
                    />
                    <Button size='icon' onClick={handleAddCustomTrait}>
                        <Plus className='h-4 w-4' />
                    </Button>
                </div>
            </div>

            {/* Generate/Regenerate Button */}
            <Button className='w-full' onClick={handleGenerate} disabled={selectedTraits.length === 0}>
                {generatedText ? <RefreshCw className='mr-2 h-4 w-4' /> : <Wand2 className='mr-2 h-4 w-4' />}
                {generatedText ? 'Regenerate Summary' : 'Generate Summary'}
            </Button>

            {/* Generated Content Section */}
            {generatedText && (
                <Card className='mt-4'>
                    <CardContent className='pt-6'>
                        {showComparison ? (
                            <Tabs defaultValue='new'>
                                <TabsList className='grid w-full grid-cols-2'>
                                    <TabsTrigger value='previous'>Previous</TabsTrigger>
                                    <TabsTrigger value='new'>New</TabsTrigger>
                                </TabsList>
                                <TabsContent value='previous'>
                                    <Textarea readOnly value={previousText} className='min-h-32' />
                                </TabsContent>
                                <TabsContent value='new'>
                                    <Textarea readOnly value={generatedText} className='min-h-32' />
                                </TabsContent>
                                <div className='flex justify-end gap-2 mt-4'>
                                    <Button variant='outline' onClick={handleRejectNew}>
                                        <X className='mr-2 h-4 w-4' />
                                        Keep Previous
                                    </Button>
                                    <Button onClick={handleAcceptNew}>
                                        <Check className='mr-2 h-4 w-4' />
                                        Accept New
                                    </Button>
                                </div>
                            </Tabs>
                        ) : (
                            <div className='space-y-4'>
                                {isEditing ? (
                                    <Textarea
                                        value={editedText}
                                        onChange={(e) => setEditedText(e.target.value)}
                                        className='min-h-32'
                                    />
                                ) : (
                                    <Textarea
                                        readOnly
                                        value={editedText}
                                        className='min-h-32'
                                        onClick={() => setIsEditing(true)}
                                    />
                                )}
                                {isEditing && (
                                    <div className='flex justify-end gap-2'>
                                        <Button
                                            variant='outline'
                                            onClick={() => {
                                                setIsEditing(false);
                                                setEditedText(generatedText);
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setIsEditing(false);
                                                // Here you would typically call AI to improve while preserving edits
                                            }}
                                        >
                                            Improve with AI
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default PersonalityTraitsStep;
