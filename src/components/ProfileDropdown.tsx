import React from 'react';
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

const ProfileDropdown: React.FC = () => {
    const email = useAppSelector(selectUserEmail);
    const router = useRouter();

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

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline'>{email}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Icons.creditCard />
                        <span>Billing</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
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
    );
};

export default ProfileDropdown;
