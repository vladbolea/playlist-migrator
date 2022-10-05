import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { env } from './env/server.mjs';

export const middleware = async (req: NextRequest) => {
  const token = await getToken({ req, secret: env.NEXTAUTH_URL });
  const { pathname } = req.nextUrl;
  
  console.log(token);

  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next();
  }
  if (!pathname.includes('/login') && !token) {
    return NextResponse.redirect('/login');
  }
};
