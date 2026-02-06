import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const secret = new TextEncoder().encode(process.env.SECRET!);

export async function middleware(request: NextRequest) {
  const token = (await cookies()).get('auth_token')?.value;

  // Redirect to login if accessing protected routes without token
  if (request.nextUrl.pathname.startsWith('/user-profile')) {
    if (!token) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    try {
      await jwtVerify(token, secret);
    } catch (err) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/user-profile/:path*']
};