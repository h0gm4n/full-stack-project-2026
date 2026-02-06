import { NextResponse } from 'next/server';

export function middleware() {
  // No-op middleware — does not enforce routes
  return NextResponse.next();
}

export const config = { matcher: [] };
