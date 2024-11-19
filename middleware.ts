import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Replace with your specific Cognito cookie name
    const authCookie = request.cookies.get('AccessToken');

    const protectedPaths = ['/builder'];
    const isPathProtected = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path));

    if (isPathProtected && !authCookie) {
        return NextResponse.redirect(new URL('/authentication', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/builder']
};
