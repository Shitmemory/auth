import NextAuth from "next-auth";
import argon2 from "argon2";
import Credentials from "next-auth/providers/credentials";
import * as v from "valibot";
import { SigninSchema } from "@/validators/signin-validator";
import { findUserByEmail } from "./resources/user-queries";
import { OAuthAccountAlreadyLinkedError } from "@/lib/custom-errors";
import { authConfig } from "@/auth.config";

const { providers: authConfigProviders, ...authConfigRest } = authConfig;

const nextAuth = NextAuth({
  ...authConfigRest,

  providers: [
    ...authConfigProviders,
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = v.safeParse(SigninSchema, credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.output;

          // look for user in db
          const user = await findUserByEmail(email);
          if (!user) return null;
          if (!user.password) throw new OAuthAccountAlreadyLinkedError(); // so if the user creates an account with an oauth provider then they will have no password and wont be able to login using a password
          // remove this then add it back in for demonstration
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

// i trust github and google as providers so i want to automatically verify the users email when they link an account with google or github.
