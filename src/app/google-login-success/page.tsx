import React, { Suspense } from 'react';
import GoogleLoginSuccess from './GoogleLoginSuccess';

export default function GoogleLoginSuccessWrapper() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GoogleLoginSuccess />
        </Suspense>
    );
}
