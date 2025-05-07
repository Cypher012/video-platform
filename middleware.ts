import { betterFetch } from '@better-fetch/fetch';
import type { auth } from '@/lib/auth/auth';
import { NextRequest, NextResponse } from 'next/server';

type Session = typeof auth.$Infer.Session;
export async function middleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    '/api/auth/get-session',
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get('cookie') || '', // Forward the cookies from the request
      },
    }
  );

  if (!session) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (session.user.accountType === 'client' && !session.user.onboarded) {
    return NextResponse.redirect(new URL('/onboarding/client', request.url));
  }

  if (session.user.accountType === 'performer' && !session.user.onboarded) {
    return NextResponse.redirect(new URL('/onboarding/performer', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'], // Apply middleware to specific routes
};
