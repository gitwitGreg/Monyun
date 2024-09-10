import { NextResponse, NextRequest } from "next/server";
import { decrypt, updateSession } from "./app/lib/lib";

export default async function middleware(req: NextRequest) {

  const protectedRoutes = ['/'];

  const currentPath = req.nextUrl.pathname;

  const isProtected = protectedRoutes.includes(currentPath);

  if (isProtected) {

    const cookie = req.cookies.get('session');

    if (!cookie) {
      return NextResponse.redirect(new URL('/signup', req.url));
    }

    const session = await decrypt(cookie.value);

    if (!session) {
      return NextResponse.redirect(new URL('/signup', req.url));
    }

    return NextResponse.next();

  }


  return NextResponse.next();

}

export const config = {
  matcher: ['/', '/dashboard', '/profile']

}