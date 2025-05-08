import NextAuth from "next-auth";
import argon2 from "argon2";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import * as v from "valibot";
import { SigninSchema } from "@/validators/signin-validator";
import { findUserByEmail } from "./resources/user-queries";
import db from "./drizzle";
import * as schema from "@/drizzle/schema";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

const nextAuth = NextAuth({
  adapter: DrizzleAdapter(db, {
    accountsTable: schema.accounts,
    usersTable: schema.users,
    authenticatorsTable: schema.authenticators,
    sessionsTable: schema.sessions,
    verificationTokensTable: schema.verificationTokens,
  }), // this gets us started with creating the user for when we login with google provider or github
  // we need to let the adapter know to use our schema and not the schema it comes with by default
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  pages: { signIn: "/auth/signin" },
  callbacks: {
    jwt({ token, user }) {
      console.log(user);
      if (user?.id) token.id = user.id; // so this will provide the jwt witht the id provided from google or github
      if (user?.role) token.role = user.role; // explain how i had to extend the types for role

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string; // so the session id, user.id and token id will all be the same
      session.user.role = token.role;
      return session;
    },
  },
  events: {
    linkAccount(message) {
      console.log(message);
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = v.safeParse(SigninSchema, credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.output;

          // look for user in db
          const user = await findUserByEmail(email);
          if (!user) return null;
          if (!user.password) return null;

          const matchingPassword = await argon2.verify(user.password, password);

          if (matchingPassword) {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
          }
        }
        return null;
      },
    }),
    // Google is set up after credentials
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
});

export const { signIn, signOut, auth, handlers } = nextAuth;

// 1 import argon2 from argon2
// 2 create a passwordsMatch variable const passwordsMatch = await argon2.verify(user.password, password);
// // 3 create if statement   if (passwordsMatch) {
//             const { password, ...userWithoutPassword } = user;
//             return userWithoutPassword
//           }
// we created a new object with all the user info excluding the passweroz

// switch between the signin-form auth.ts and signin-user-action

// after fixing the intrernal server error include the redirect in the signin form

// after this handle errors for sign in inside the user action and add  if (err instanceof AuthError) {
// switch(err.type) {
//   case "CredentialsSignin":
//     case "CallbackRouteError":
// }

// extend the types of auth error for type property

// change the res type to accept a 401 code

// go back to the signin form and handle the 401 case     case 401:
// setError("password", {message: res.error})
