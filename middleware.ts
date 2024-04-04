import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextApiRequest } from "next";

export async function middleware(req: NextApiRequest) {
  const session = await getToken({ req, secret: process.env.AUTH_SECRET });

  // Check if the path is "/auth/login".
  const url = req.url;
  const isLoginPage = url?.includes("/login");

  if (session) {
    // If there is an active session and the user tries to access "/auth/login".
    if (isLoginPage) {
      // Redirect to "/myDocuments"
      return NextResponse.redirect(new URL("/notes", req.url));
    }
  } else {
    // If there is no active session and the user is not in "/auth/login".
    const requestedPage = req?.url;
    const url = new URL("/login", req.url);
    url.searchParams.set("p", requestedPage ?? "");
    if (!isLoginPage) {
      // Redirect to "/auth/login"
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/notes"],
};