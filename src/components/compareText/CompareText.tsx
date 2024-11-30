import { DrawerDialog } from '../DrawerDialog';
import { Details } from './Details';

export type CompareTextState = {
    previousText: string;
    newText: string;
    onAccept: (acceptedText: string) => void;
    onReject: () => void;
};

interface CompareTextProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    previousText: string;
    newText: string;
    onAccept: (acceptedText: string) => void;
    onReject: () => void;
}

export const CompareText: React.FC<CompareTextProps> = ({
    isOpen,
    setIsOpen,
    previousText,
    newText,
    onAccept,
    onReject
}) => {
    return (
        <DrawerDialog
            // trigger={<Button variant='outline'>Compare Text</Button>}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title='Compare Text'
            description='Compare the previous and new text to see the changes'
            // closeText='Close'
            content={<Details previousText={previousText} newText={newText} onAccept={onAccept} onReject={onReject} />}
        />
    );
};
