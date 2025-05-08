// types/next-auth.d.ts

import type { JWT as DefaultJWT } from "next-auth/jwt";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    role: typeof users.$inferSelect;
  }

  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
    };
  }
}
