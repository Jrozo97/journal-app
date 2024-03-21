import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(req: NextRequest) {

  const sesion = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if (!sesion) {
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.search = `p=${requestedPage}`;
    return NextResponse.redirect(url)
  }

  return NextResponse.next()

}

export const config = { matcher: ["/notes"] }