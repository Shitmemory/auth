import NextAuth, { Session } from "next-auth";
import { authConfig } from "./auth.config";
import { NextRequest } from "next/server";

export default NextAuth(authConfig).auth; // this is only valid if i am on next-auth@4.22.1+
// so what the above code does is NextAuth(authConfig) uses the authConfig to generate an object that
// includes the .auth middleware handler. so NextAuth(authConfig) takes the logic from authConfig and creates a new object.
//  The .auth middleware function is generated using the rules defined in authConfig

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // the ?! syntax  is a negative lookahead assertion. this tells the regex to exclude paths that match any of the patterns inside the lookahead
}; // when first copying this to middleware I will get an error saying cannot find module node:crypto
// this is because in the auth file we have code that relies on crypto modules and middleware doesnt allow this

// type NextAuthRequest = NextRequest & { auth: Session | null }; // I am extending nextrequest by giving it a new prop called .auth and i am assigning the type of that property to be Session

// const auth = NextAuth(authConfig).auth;

// export default auth((request: NextAuthRequest) => {
//   const { auth, nextUrl } = request;
//   const isLoggedIn = !!auth?.user;
//   const isOnProfile = nextUrl.pathname.startsWith("/profile");
//   const isOnAuth = nextUrl.pathname.startsWith("/auth"); // this will cover both the signin and signup pages because they both have auth before them

//   if (isOnProfile) {
//     if (isLoggedIn) return;
//     return Response.redirect(new URL("/auth/signin", nextUrl));
//   }

//   if (isOnAuth) {
//     if (!isLoggedIn) return;
//     return Response.redirect(new URL("/profile", nextUrl));
//   }

//   return;
// });

// export default NextAuth(authConfig).auth
// there are security concerns for the function above. By exporting NextAuth(authConfig).auth
// in the middleware I am bypassing NextAuths internal flow and making it accessible in ways
// that might not be intended for middleware logic.
