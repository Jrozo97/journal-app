import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const sesion = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Check if the path is "/auth/login".
  const url = req.nextUrl.clone();
  const isLoginPage = url.pathname === "/login";

  if (sesion) {
    // If there is an active session and the user tries to access "/auth/login".
    if (isLoginPage) {
      // Redirect to "/myDocuments"
      return NextResponse.redirect(new URL("/notes", req.url));
    }
  } else {
    // If there is no active session and the user is not in "/auth/login".
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.search = `p=${requestedPage}`;
    if (!isLoginPage) {
      // Redirect to "/auth/login"
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/notes"],
};