import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, X } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DetailsProps {
    previousText: string;
    newText: string;
    onAccept: (acceptedText: string) => void;
    onReject: () => void;
}

export const Details: React.FC<DetailsProps> = ({ previousText, newText, onAccept, onReject }) => {
    return (
        <Card className='mt-4'>
            <CardContent className='pt-6'>
                <Tabs defaultValue='new'>
                    <TabsList className='grid w-full grid-cols-2'>
                        <TabsTrigger value='previous'>Previous</TabsTrigger>
                        <TabsTrigger value='new'>New</TabsTrigger>
                    </TabsList>
                    <TabsContent value='previous'>
                        <Textarea readOnly value={previousText} className='min-h-72' />
                    </TabsContent>
                    <TabsContent value='new'>
                        <Textarea readOnly value={newText} className='min-h-72' />
                    </TabsContent>
                    <div className='flex justify-end gap-2 mt-4'>
                        <Button variant='outline' onClick={onReject}>
                            <X className='mr-2 h-4 w-4' />
                            Keep Previous
                        </Button>
                        <Button onClick={() => onAccept(newText)}>
                            <Check className='mr-2 h-4 w-4' />
                            Accept New
                        </Button>
                    </div>
                </Tabs>
            </CardContent>
        </Card>
    );
};
