import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt/types.js';
import SpotifyProvider from 'next-auth/providers/spotify';
import GoogleProvider from 'next-auth/providers/google';

import { env } from '../../../env/server.mjs';
import spotifyApi from '../../../utils/spotify';
import { prisma } from '../../../server/db/client';

const refreshAccessToken = async (token: JWT) => {
  if (token.provider === 'spotify') {
    try {
      spotifyApi.setAccessToken(token.accessToken as string);
      spotifyApi.setRefreshToken(token.refreshToken as string);

      const { body } = await spotifyApi.refreshAccessToken();
      token.accessToken = body.access_token;
      token.refreshToken = body.refresh_token ?? (token.refreshToken as string);
      token.accessTokenExpires = body.expires_in * 1000;
      return token as JWT;
    } catch (error) {
      console.error(error);
    }
  }
  if (token.provider === 'google') {
    //find how to rotate google token
  }
};

const saveUserProfile = async (token: string) => {
  await fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/spotify/currentUser`, {
    method: 'GET',
    headers: {
      method: 'GET',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

const scopes = [
  'playlist-read-private',
  'user-read-private',
  'user-read-email',
  'playlist-modify-public',
  // 'user-read-playback-position',
  // 'playlist-modify-private',
  // 'playlist-read-public',
  // 'playlist-read-private',
  // 'user-library-read',
  // 'user-library-modify',
  // 'user-top-read',
  // 'playlist-read-collaborative',
  // 'ugc-image-upload',
  // 'user-follow-read',
  // 'user-follow-modify',
  // 'user-read-playback-state',
  // 'user-modify-playback-state',
  // 'user-read-currently-playing',
  // 'user-read-recently-played',
].join('%20');

//build query params from scopes array of strings
// const params = new URLSearchParams({ scope: scopes }).toString();

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
      clientSecret: env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
      authorization: `https://accounts.spotify.com/authorize?scope=${scopes}`,
    }),

    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
          scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/youtube',
          ].join(' '),
        },
      },
    }),

    //add more providers here...
  ],

  callbacks: {
    async jwt({ token, account, user }): Promise<JWT> {
      //only run this on spotify since the app is built around it -> the google data is saved in the db
      if (account && user) {
        await saveUserProfile(account.access_token as string);
        token.provider = account?.provider;
        token.accessToken = account?.access_token;
        token.refreshToken = account?.refresh_token;
        token.username = account?.providerAccountId;
        token.accessTokenExpires = account?.expires_at
          ? account?.expires_at * 1000
          : null;
        return token;
      }
      //spotify access token rotation
      if (Date.now() > (token.accessTokenExpires as number)) {
        return (await refreshAccessToken(token)) as JWT;
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token?.accessToken;
      session.refreshToken = token?.refreshToken;
      session.username = token?.username;
      session.provider = token?.provider;
      return session;
    },
  },
  secret: env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 3600,
    updateAge: 3600,
  },
  // debug: true,
  pages: {
    signIn: '/login',
  },
};

export default NextAuth(authOptions);
export { refreshAccessToken };
