import { NextResponse, NextRequest } from "next/server";
import { decrypt, updateSession } from "./app/lib/lib";

export default async function middleware(req: NextRequest) {

  const protectedRoutes = ['/'];

  const currentPath = req.nextUrl.pathname;

  console.log("Current Path:", currentPath);

  const isProtected = protectedRoutes.includes(currentPath);


  if (isProtected) {

    const cookie = req.cookies.get('session');

    console.log('cookie: ', cookie)


    if (!cookie) {
      console.log("No cookie found, redirecting to /signup");
      return NextResponse.redirect(new URL('/signup', req.url));
    }


    const session = await decrypt(cookie.value);
    
    console.log("Session:", session);

    if (!session) {
      console.log("No session found, redirecting to /signup");
      return NextResponse.redirect(new URL('/signup', req.url));
    }

    console.log('should make be showing whats on the page')

    return NextResponse.next();

  }


  return NextResponse.next();

}

export const config = {
  matcher: ['/', '/dashboard', '/profile']

}