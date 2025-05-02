import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Add more providers here as needed
  ],
  callbacks: {
    async session(session, user) {
      // Attach the user ID from Supabase to the session
      session.user.id = user.id;  // Assuming user.id is the Supabase user ID
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // You can set a custom secret if needed
});

export { handler as GET, handler as POST };
