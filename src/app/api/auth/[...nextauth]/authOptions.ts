import GoogleProvider from "next-auth/providers/google";  // For Google OAuth
import { NextAuthOptions } from "next-auth";  // Importing the NextAuth type

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // You can add other providers here like GitHub, Email, etc.
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;  // Save the user id in the JWT token
      }
      return token;
    },
    
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;  // Add user id to the session object
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",  // We are using JWT to manage sessions
  },

  secret: process.env.NEXTAUTH_SECRET!,  // Secret key for JWT signing
};
