import React, { useState } from 'react';
import { DrawerDialog } from './DrawerDialog';
import { QuickLinks } from './QuickLinks';

type QuickLinksDrawerProps = {};

export const QuickLinksDrawer: React.FC<QuickLinksDrawerProps> = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <DrawerDialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title='Quick links'
            description='Handy quick links to help you navigate the builder.'
            closeText='Close'
            content={<QuickLinks />}
        />
    );
};
