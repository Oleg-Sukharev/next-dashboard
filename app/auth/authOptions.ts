import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/prisma/client';
import { NextAuthOptions } from 'next-auth';
import GithubProvider from "next-auth/providers/github";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  // debug: process.env.NODE_ENV === "development",
  // callbacks: {
  //   async jwt({ token, account, user }) {
  //     console.log("JWT Callback Payload:", { token, account, user });
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     console.log("Session Callback Payload:", { session, token });
  //     return session;
  //   },
  // },
};

export default authOptions;