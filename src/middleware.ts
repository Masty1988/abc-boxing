import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware pour rediriger toutes les pages vers la Coming Soon
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Liste des pages à rediriger vers la Coming Soon
  const pagesToRedirect = [
    '/inscription',
    '/club',
    '/actualites',
    '/galerie',
  ];

  // Si l'utilisateur essaie d'accéder à une de ces pages, rediriger vers /
  if (pagesToRedirect.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Configurer le matcher pour cibler les pages spécifiques
export const config = {
  matcher: ['/inscription', '/club', '/actualites', '/galerie'],
};
