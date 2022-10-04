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
  clientId: env.SPOTIFY_CLIENT_ID,
  clientSecret: env.SPOTIFY_CLIENT_SECRET,
});

export default spotifyApi;
export { LOGIN_URL };
