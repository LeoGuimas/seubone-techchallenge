import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Obtenha o token do cookie
  const token = req.cookies.get('next-auth.session-token')?.value;

  // Permitir requisições:
  // 1. Para autenticação (rota `/api/auth`)
  // 2. Se o token JWT estiver presente
  if (pathname.startsWith('/api/auth') || token) {
    return NextResponse.next();
  }

  // Redirecione para `/login` se não houver token e o usuário estiver tentando acessar rota protegida
  if (!token && pathname.startsWith('/recortes')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}