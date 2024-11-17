import React, { useState } from 'react';
import { useAppSelector } from '@/lib/store/hooks';
import { selectUserEmail } from '@/lib/store/authentication/authenticationSlice';
import { Icons } from './icons';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { getCookie } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { DialogFooter, DialogHeader } from './ui/dialog';

const ProfileDropdown: React.FC = () => {
    const email = useAppSelector(selectUserEmail);
    const router = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleLogout = async () => {
        console.log('Logout clicked');
        if (getCookie('Google')) {
            window.location.href =
                `${process.env.NEXT_PUBLIC_COGNITO_DOMAIN}/logout?` +
                new URLSearchParams({
                    client_id: process.env.NEXT_PUBLIC_COGNITO_APP_CLIENT_ID as string,
                    logout_uri: `${origin}/authentication/logout`
                });
        } else {
            router.push('/authentication/logout');
        }
    };

    const handleBilling = () => {
        setIsDialogOpen(true);
    };

    const handleSettings = () => {
        setIsDialogOpen(true);
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='outline'>{email}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56'>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem onSelect={() => handleBilling()}>
                            <Icons.creditCard />
                            <span>Billing</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleSettings()}>
                            <Icons.cog6Tooth />
                            <span>Settings</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => handleLogout()}>
                        <Icons.arrowRightStartOnRectangle />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className='fixed inset-0 flex items-center justify-center'>
                    <div className='bg-gray-200 p-6 rounded-lg shadow-lg space-y-6'>
                        <DialogHeader>
                            <DialogTitle>Coming Soon</DialogTitle>
                            <DialogDescription>This feature is coming soon. Stay tuned!</DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ProfileDropdown;
