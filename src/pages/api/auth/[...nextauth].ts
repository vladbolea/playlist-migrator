import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt/types.js';
import SpotifyProvider from 'next-auth/providers/spotify';
import GoogleProvider from 'next-auth/providers/google';

import { env } from '../../../env/server.mjs';
import spotifyApi from '../../../utils/spotify';
import prisma from '../prisma/prisma-client';

const refreshAccessToken = async (token: JWT) => {
  try {
    spotifyApi.setAccessToken(token.accessToken as string);
    spotifyApi.setRefreshToken(token.refreshToken as string);

    const { body } = await spotifyApi.refreshAccessToken();

    token.accessToken = body.access_token;
    token.refreshToken = body.refresh_token ?? (token.refreshToken as string);
    token.accessTokenExpires = body.expires_in * 1000;
    return token;
  } catch (error) {
    console.error(error);
  }
};

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
      clientSecret: env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
      authorization:
        'https://accounts.spotify.com/authorize?scope=playlist-read-private',
    }),

    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),

    //add more providers here...
  ],

  callbacks: {
    async jwt({ token, account, user }): Promise<JWT> {
      if (account && user) {
        token.accessToken = account?.access_token;
        token.refreshToken = account?.refresh_token;
        token.username = account?.providerAccountId;
        token.accessTokenExpires = account?.expires_at
          ? account?.expires_at * 1000
          : null;

        return token;
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // If access token has expired, try to update it
      return (await refreshAccessToken(token)) as JWT;
    },

    async session({ session, token }) {
      session.accessToken = token?.accessToken;
      session.refreshToken = token?.refreshToken;
      session.username = token?.username;

      return session;
    },
  },
  secret: env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  // debug: true,
};

export default NextAuth(authOptions);
