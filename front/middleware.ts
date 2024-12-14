import { NextRequest } from "next/server";
import { auth } from "./utils/session";
import { AUTH_ROUTES, DEFAULT_REDIRECT, PUBLIC_ROUTES } from "./routes";

export default (async (req: NextRequest) => {
  
  const nextUrl = req.nextUrl;
  const isLoggedIn = !!(await auth())

  const isOnAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);
  const isOnPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  if (isOnAuthRoute) {
    if (isLoggedIn) return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl))
    return;
  }

  if (!isLoggedIn && !isOnPublicRoute) return Response.redirect(new URL('/', nextUrl))

  return;

})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
