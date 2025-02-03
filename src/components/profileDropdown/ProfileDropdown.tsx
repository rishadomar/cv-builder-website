import React, { useState } from 'react';
import { useAppSelector } from '@/lib/store/hooks';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { getCookie } from '@/lib/utils';
import { CircleUserRound, Cog, CreditCard, LogOut, LogOutIcon, Mail, SquareArrowOutUpRight } from 'lucide-react';
import { DrawerDialog } from '../DrawerDialog';
import { QuickLinks } from './QuickLinks';
import { resetAuthenticationFields } from '@/lib/store/api/authenticationApiUtils';
import { Chrome } from 'lucide-react';

const ProfileDropdown: React.FC = () => {
    const authentication = useAppSelector((state) => state.authentication);
    const router = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isQuickLinksDialogOpen, setIsQuickLinksDialogOpen] = useState(false);

    const handleLogout = async () => {
        if (getCookie('Google') && getCookie('Google') === 'true') {
            await resetAuthenticationFields();
            window.location.href =
                `${process.env.NEXT_PUBLIC_COGNITO_DOMAIN}/logout?` +
                new URLSearchParams({
                    client_id: process.env.NEXT_PUBLIC_COGNITO_APP_CLIENT_ID as string,
                    logout_uri: `${origin}/authentication/logout`
                });
            return;
        }
        router.push('/authentication/logout');
    };

    const handleBilling = () => {
        router.push('/billing');
    };

    const handleSettings = () => {
        setIsDialogOpen(true);
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <span className='cursor-pointer'>
                        <CircleUserRound className='text-gray-400' />
                    </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56'>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuItem disabled>
                        <div className='flex items-center gap-1'>
                            {getCookie('Google') && getCookie('Google') === 'true' ? (
                                <Chrome className='w-4 h-4' />
                            ) : (
                                <Mail className='w-4 h-4' />
                            )}
                            <span className='ml-2'>{authentication.email ?? 'None'}</span>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem onSelect={() => handleBilling()}>
                            <CreditCard />
                            <span>Billing</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleSettings()}>
                            <Cog />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setIsQuickLinksDialogOpen(true)}>
                            <SquareArrowOutUpRight />
                            <span>Quick links</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => handleLogout()}>
                        <LogOutIcon />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {isQuickLinksDialogOpen && (
                <DrawerDialog
                    isOpen={isQuickLinksDialogOpen}
                    setIsOpen={setIsQuickLinksDialogOpen}
                    title='Quick links'
                    description='Handy quick links to help you navigate the builder.'
                    closeText='Close'
                    content={<QuickLinks />}
                />
            )}

            {isDialogOpen && (
                <DrawerDialog
                    isOpen={isDialogOpen}
                    setIsOpen={setIsDialogOpen}
                    title='Coming soon'
                    description='This feature is coming soon. Stay tuned!'
                    closeText='Close'
                    content={<div />}
                />
            )}
        </>
    );
};

export default ProfileDropdown;
