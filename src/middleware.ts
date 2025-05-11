import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware enables CORS for API routes
export function middleware(request: NextRequest) {
  // Check if the request is for an API route
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Get response from the origin
    const response = NextResponse.next();

    // Add CORS headers to allow requests from any origin
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*',
};
