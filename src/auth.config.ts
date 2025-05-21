import { DrizzleAdapter } from "@auth/drizzle-adapter";
import * as schema from "@/drizzle/schema";
import type { NextAuthConfig } from "next-auth";
import db from "./drizzle";
import { OAuthVerifyEmailAction } from "./actions/oauth-verify-email-action";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { USER_ROLES } from "./lib/constants";
import { changeUserRoleAction } from "./actions/change-user-role-action";
import type { AdapterUser } from "@auth/core/adapters";
import { getTableColumns } from "drizzle-orm";
import { findAdminUserEmailAddresses } from "./resources/admin-user-email-address-queries";

export const authConfig = {
  adapter: {
    ...DrizzleAdapter(db, {
      accountsTable: schema.accounts,
      usersTable: schema.users,
      authenticatorsTable: schema.authenticators,
      sessionsTable: schema.sessions,
      verificationTokensTable: schema.verificationTokens,
    }),
    async createUser(data: AdapterUser) {
      const { id, ...insertData } = data;
      const hasDefaultId = getTableColumns(schema.users)["id"]["hasDefault"];

      const adminEmails = await findAdminUserEmailAddresses();
      const isAdmin = adminEmails?.includes(insertData.email.toLowerCase());

      if (isAdmin) {
        insertData.role = isAdmin ? USER_ROLES.ADMIN : USER_ROLES.USER;
      }

      return db
        .insert(schema.users)
        .values(hasDefaultId ? insertData : { ...insertData, id })
        .returning()
        .then((res) => {
          const user = res[0];

          if (!user || !user.email) {
            throw new Error("Created user is invalid: missing email");
          }

          return user as AdapterUser;
        });
    },
  }, // this gets us started with creating the user for when we login with google provider or github
  // we need to let the adapter know to use our schema and not the schema it comes with by default
  // instead of having to include the properties, i can spread DrizzleAdapter into adapters and overwrite methods to suit my needs. so i could override the createUser method to deal with the admin logic

  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  pages: { signIn: "/auth/signin" },
  callbacks: {
    authorized({ auth, request }) {
      // authorized is middleware
      const { nextUrl } = request;
      const isLoggedIn = !!auth?.user;
      const isOnProfile = nextUrl.pathname.startsWith("/profile");
      const isOnAuth = nextUrl.pathname.startsWith("/auth"); // this will cover both the signin and signup pages because they both have auth before them

      if (isOnProfile) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL("/auth/signin", nextUrl));
      }

      if (isOnAuth) {
        if (!isLoggedIn) return true;
        return Response.redirect(new URL("/profile", nextUrl));
      }

      return true;
    }, // demo this function after showing how to redirect with redirect in the sign in pages etc
    jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }

      console.log(user);
      if (user?.id) token.id = user.id; // so this will provide the jwt witht the id provided from google or github
      if (user?.role) token.role = user.role; // explain how i had to extend the types for role

      // if (
      //   user?.email &&
      //   process.env.ADMIN_EMAIL_ADDRESS?.toLowerCase() ===
      //     user.email.toLowerCase()
      // ) {
      //   token.role = USER_ROLES.ADMIN;
      // } // the only reason why we are using this if statement in the jwt callback is an issue that happens when you create the account for the first time
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string; // so the session id, user.id and token id will all be the same
      session.user.role = token.role;
      return session;
    },
    signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        return !!profile?.email_verified; // this is from your google account not from the db. sof for some reason if the users google account is not verified they wont be able to sign into their account.
      }
      if (account?.provider === "github") {
        return true;
      }

      if (account?.provider === "credentials") {
        if (user.emailVerified) {
          // return true
        }
        return true;
      } // before credential users had null for the emailVerified row and this fixes that problem
      return false;
    },
  },
  events: {
    async linkAccount({ user, account }) {
      if (["google", "github"].includes(account.provider)) {
        // verify the user email
        if (user.email) await OAuthVerifyEmailAction(user.email);
      }
    },
    // async createUser({ user }) {
    //   if (
    //     user.email &&
    //     process.env.ADMIN_EMAIL_ADDRESS?.toLowerCase() ===
    //       user.email.toLowerCase()
    //   ) {
    //     await changeUserRoleAction(user.email, USER_ROLES.ADMIN);
    //   }
    // },
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
} satisfies NextAuthConfig;

// all of this info was in the auth file before but i removed all the code that didnt rely on the crypto module and moved it into this file.
