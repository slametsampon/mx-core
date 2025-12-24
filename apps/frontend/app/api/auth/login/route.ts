// apps/frontend/app/api/auth/login/route.ts

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  // Dummy logic sementara
  if (username === 'admin' && password === 'admin123') {
    return NextResponse.json({
      username: 'admin',
      role: 'admin',
      avatarUrl: 'https://i.pravatar.cc/100?u=admin',
    });
  }

  return NextResponse.json(
    { message: 'Username/password salah.' },
    { status: 401 }
  );
}
