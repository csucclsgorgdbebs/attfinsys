import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();

  // 1. Redirect if not logged in
  if (!session && !req.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // 2. Role-Based Redirection
  const role = session?.user?.user_metadata?.role; 
  const path = req.nextUrl.pathname;

  if (path.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/scan', req.url));
  }
  
  if (path.startsWith('/super-admin') && role !== 'super-admin') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return res;
}
