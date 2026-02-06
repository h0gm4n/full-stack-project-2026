import { NextResponse } from 'next/server';

export async function POST() {
  // Route disabled — no-op
  return NextResponse.json({ ok: false, message: 'disabled' }, { status: 405 });
}
