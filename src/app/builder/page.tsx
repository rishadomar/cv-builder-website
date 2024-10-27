'use client';
import { useAppSelector } from '@/lib/store/hooks';
import { selectIsLoggedIn } from '@/lib/store/authentication/authenticationSlice';

export default function Builder() {
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    return <>{isLoggedIn ? <div>Logged in</div> : <div>Not logged in</div>}</>;
}
