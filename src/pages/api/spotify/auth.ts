import { env } from '../../../env/server.mjs';

export default async function handler(req, res) {
  // const { accessToken } = req;

  const client_id = env.SPOTIFY_CLIENT_ID;
  const client_secret = env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = env.SPOTIFY_REDIRECT_URL;

  const data = new URLSearchParams();
  data.append('grant_type', 'client_credentials');
  data.append('redirect_uri', redirect_uri);
  data.append('code', '');

  const authOptions = {
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(client_id + ':' + client_secret).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: data,

    json: true,
  };

  try {
    const { access_token } = await fetch(
      'https://accounts.spotify.com/api/token',
      authOptions
    ).then((r) => r.json());

    res.status(200).json({ access_token });
  } catch (error) {
    res.status(500).json(error);
  }
}
