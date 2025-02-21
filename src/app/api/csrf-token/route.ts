import { NextResponse } from 'next/server';
import { createHmac } from 'crypto';

export async function GET() {
  const secret = process.env.CSRF_SECRET;

  if (!secret) {
    return NextResponse.json(
      { error: 'CSRF_SECRET não configurado' },
      { status: 500 },
    );
  }

  const randomValue = Math.random().toString(36).substring(2);
  const token = createHmac('sha256', secret).update(randomValue).digest('hex');

  const response = NextResponse.json({ token });
  response.cookies.set({
    name: 'csrf-token',
    value: token,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
  });

  return response;
}
