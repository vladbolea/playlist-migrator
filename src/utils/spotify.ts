// import { useSession } from 'next-auth/react/index.js';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import { env } from '../env/server.mjs';

const scopes = [
  'user-read-email',
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-read-private',
  'user-library-read',
].join(',');

const params = {
  scope: scopes,
};

const queryParamsString = new URLSearchParams(params).toString();

const LOGIN_URL = `https://accouns.spotify.com/authorize?${queryParamsString}`;

const spotifyApi = new SpotifyWebApi({
  clientId: '37dd33c7c74440e79de0a04509947ff0',
  clientSecret: 'e2217ec726df4b86829995a1624c988e',
});

const useSpotify = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      spotifyApi.setAccessToken(session.accessToken as string);
    }
  }, [session]);
  return spotifyApi;
};

export default spotifyApi;
export { LOGIN_URL, useSpotify };
