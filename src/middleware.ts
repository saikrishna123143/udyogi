import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // Protected routes (Only authenticated users can access)
  if (pathname.startsWith('/dashboards')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Role-based access control
    const role = token.role;

    if (pathname.startsWith('/dashboards/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboards/admin', req.url));
    }
    if (pathname.startsWith('/dashboards/manager') && role !== 'manager') {
      return NextResponse.redirect(new URL('/dashboards/manager', req.url));
    }
    if (pathname.startsWith('/dashboards/hr') && role !== 'hr') {
      return NextResponse.redirect(new URL('/dashboards/hr', req.url));
    }
    if (pathname.startsWith('/dashboards/user') && role !== 'user') {
        return NextResponse.redirect(new URL('/dashboards/user', req.url));
      }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboards/:path*'], // Apply middleware to all dashboard routes
};
