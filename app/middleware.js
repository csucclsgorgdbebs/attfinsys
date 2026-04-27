import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();

  const path = req.nextUrl.pathname;

  // 1. Redirect to login if no session (excluding login page and static assets)
  if (!session && !path.startsWith('/login') && !path.startsWith('/_next')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // 2. Role-Based Redirection
  // Note: We check actual functional paths (like /students) rather than folder names
  const role = session?.user?.user_metadata?.role; 

  // Protect Admin-only routes (e.g., /students, /dashboard, /reports)
  const adminRoutes = ['/students', '/dashboard', '/reports'];
  const isAdminPath = adminRoutes.some(route => path.startsWith(route));

  if (isAdminPath && role !== 'admin') {
    return NextResponse.redirect(new URL('/scan', req.url));
  }
  
  // Protect Super-Admin routes
  if (path.startsWith('/super-admin') && role !== 'super-admin') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return res;
}

// Ensure middleware doesn't run on images or static files which causes slowdowns
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
