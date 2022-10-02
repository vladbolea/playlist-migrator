import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import { env } from '../../../env/server.mjs';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user, token }) {
      if (session.user && token) {
        session.user.id = String(token.id);
      }
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET,
      profile(profile, _) {
        return {
          id: String(profile.id),
          name: profile?.display_name,
          email: profile?.email,
          image: profile.images?.[0].url,
        };
      },
    }),
    // ...add more providers here
  ],
  adapter: PrismaAdapter(prisma),
};

export default NextAuth(authOptions);
